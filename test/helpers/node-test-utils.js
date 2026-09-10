import fs from "node:fs";
import path from "node:path";
import { tmpNameSync } from "tmp";
import JSZip from "../../lib/index.js";

globalThis.JSZip = JSZip;
globalThis.JSZipNodeTestUtils = { fs, tmpNameSync };

globalThis.JSZipTestUtils.loadZipFile = function(name, callback) {
    fs.readFile(path.join("test", name), "binary", callback);
};
process.on("uncaughtException", function(err) {
    console.log("uncaughtException: " + err, err.stack);
    process.exit(1);
});

process.on("unhandledRejection", function(err) {
    console.log("unhandledRejection: " + err, err.stack);
    process.exit(1);
});
