"use strict";

QUnit.module("constructor");

QUnit.test("JSZip exists", function(assert){
    assert.ok(JSZip, "JSZip exists");
});

QUnit.test("new JSZip()", function(assert){
    var zip = new JSZip();
    assert.ok(zip instanceof JSZip, "Constructor works");
});

QUnit.test("JSZip() requires new", function(assert){
    assert.throws(function () {
        JSZip();
    }, TypeError, "ES class constructors require `new`");
});
