import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import playwright from "playwright";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".zip": "application/zip"
};

async function serveStaticFile(request, response) {
    try {
        const requestPath = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
        let filePath = path.resolve(projectRoot, "." + requestPath);
        const relativePath = path.relative(projectRoot, filePath);
        if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
            response.writeHead(403).end("Forbidden");
            return;
        }
        if ((await stat(filePath)).isDirectory()) {
            filePath = path.join(filePath, "index.html");
        }
        const body = await readFile(filePath);
        response.writeHead(200, {
            "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
        });
        response.end(body);
    } catch {
        response.writeHead(404).end("Not found");
    }
}

/** @typedef {{
      name: string,
      message: string,
      module: string,
      result: boolean,
      expected: unknown,
      actual: unknown,
      source: string
    }} Failure
*/

/**
 * @typedef {{ passed: number, failed: number, total: number, runtime: number, tests: Failure[] }} Results
 */

/**
 * @param {string} browserType
 * @returns {Promise<[string, Results]>}
 */
async function runBrowser(browserType, waitFor, file) {
    console.log("Starting", browserType);
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`http://127.0.0.1:8080/test/${file}`);
    const result = await waitFor(page);

    console.log("Closing", browserType);
    await browser.close();

    return [browserType, result];
}

async function runBrowsers(waitFor, file) {
    const browsersTypes = (process.env.PLAYWRIGHT_BROWSERS || "chromium,firefox,webkit")
        .split(",")
        .map(browser => browser.trim())
        .filter(Boolean);

    const server = createServer(serveStaticFile);
    await new Promise(resolve => server.listen(8080, "127.0.0.1", resolve));
    console.log("Server started");

    try {
        const results = await Promise.all(browsersTypes.map(b => runBrowser(b, waitFor, file)));
        return results;
    } finally {
        server.close();
    }
}

async function waitForTests(page) {
    let result;
    do {
        result = await page.evaluate(() => {
            return window.global_test_results;
        });
    } while (!result);
    return result;
}

async function runTests() {
    const results = await runBrowsers(waitForTests, "index.html?hidepassed");

    let failures = false;
    for (const result of results) {
        console.log(...result);
        failures = failures || result[1].failed > 0;
    }

    if (failures) {
        console.log("Tests failed");
        process.exit(1);
    } else {
        console.log("Tests passed!");
    }
}

async function waitForBenchmark(page) {
    return new Promise(resolve => {
        const logs = [];

        page.on("console", async message => {
            if (message.text() === "Benchmark complete") {
                resolve(logs);
            } else {
                logs.push(message.text());
            }
        });
    });
}

async function runBenchmark() {
    const results = await runBrowsers(waitForBenchmark, "benchmark/index.html");

    for (const [browser, logs] of results) {
        for (const log of logs) {
            console.log(browser, log);
        }
    }
}

switch (process.argv[2]) {
case "--test":
    runTests();
    break;
case "--benchmark":
    runBenchmark();
    break;
default:
    throw new Error(`Unknown argument: ${process.argv[2]}`);
}
