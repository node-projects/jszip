import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const licenseHeader = await readFile(new URL("../lib/license_header.js", import.meta.url), "utf8");
const banner = licenseHeader.replace(/__VERSION__/, packageJson.version);
const sharedOptions = {
    entryPoints: [fileURLToPath(new URL("../lib/index.js", import.meta.url))],
    bundle: true,
    format: "iife",
    globalName: "JSZipBundle",
    banner: { js: banner },
    footer: { js: "var JSZip = JSZipBundle.JSZip;" },
    platform: "browser"
};

await Promise.all([
    build({
        ...sharedOptions,
        outfile: fileURLToPath(new URL("../dist/jszip.js", import.meta.url))
    }),
    build({
        ...sharedOptions,
        minify: true,
        outfile: fileURLToPath(new URL("../dist/jszip.min.js", import.meta.url))
    })
]);
