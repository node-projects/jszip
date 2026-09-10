import { GenericWorker } from "./stream/GenericWorker.js";
import flate from "./flate.js";

export const STORE = {
    magic: "\x00\x00",
    compressWorker : function () {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
export const DEFLATE = flate;

export default {
    STORE, DEFLATE
};
