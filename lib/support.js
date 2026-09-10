export const base64 = true;
export const array = true;
export const string = true;
export const arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
export const nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
export const uint8array = typeof Uint8Array !== "undefined";

export let blob = false;
if (typeof ArrayBuffer === "undefined") {
    blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            blob = builder.getBlob("application/zip").size === 0;
        }
        catch (e) {
            blob = false;
        }
    }
}

export let nodestream = false;
try {
    nodestream = !!require("readable-stream").Readable;
} catch(e) {
    nodestream = false;
}

export default {
    base64, array, string, arraybuffer, nodebuffer, uint8array, blob, nodestream
};
