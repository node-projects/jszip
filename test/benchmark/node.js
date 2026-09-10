"use strict";

globalThis.Benchmark = require("benchmark");
globalThis.JSZip = require("../../lib/index").JSZip;

const benchmark = require("./benchmark");
benchmark("nodebuffer");
