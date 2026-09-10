"use strict";

module.exports = function(grunt) {
    var version = require("./package.json").version;
    var esbuild = require("esbuild");
    var banner = grunt.file.read("lib/license_header.js").replace(/__VERSION__/, version);
    var sharedOptions = {
        entryPoints: ["lib/index.js"],
        bundle: true,
        format: "iife",
        globalName: "JSZipBundle",
        banner: {js: banner},
        footer: {js: "var JSZip = JSZipBundle.JSZip;"},
        platform: "browser"
    };

    grunt.registerTask("build", function() {
        var done = this.async();
        Promise.all([
            esbuild.build(Object.assign({}, sharedOptions, {
                outfile: "dist/jszip.js"
            })),
            esbuild.build(Object.assign({}, sharedOptions, {
                minify: true,
                outfile: "dist/jszip.min.js"
            }))
        ]).then(function() {
            done();
        }, function(error) {
            grunt.log.error(error);
            done(false);
        });
    });
    grunt.registerTask("default", ["build"]);
};
