import Benchmark from "benchmark";
import JSZip from "../../lib/index.js";
import benchmark from "./benchmark.js";

globalThis.Benchmark = Benchmark;
globalThis.JSZip = JSZip;

benchmark("nodebuffer");
