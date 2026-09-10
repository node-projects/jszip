JSZip
=====
A fork of JSZip maintained as a modern ESM package.

Upstream baseline: reviewed and selectively synchronized through
[`609d95f4098a11507160cd101e0b181cfad6a582`](https://github.com/Stuk/jszip/commit/609d95f4098a11507160cd101e0b181cfad6a582).
Fork-specific build, release, dependency, and CI differences are intentionally retained.

A library for creating, reading and editing .zip files with JavaScript, with a
lovely and simple API.

See https://stuk.github.io/jszip for all the documentation.

```shell
npm install @node-projects/jszip
```

```javascript
import JSZip from "@node-projects/jszip";

const zip = new JSZip();

zip.file("Hello.txt", "Hello World\n");

const img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});

zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});

/*
Results in a zip containing
Hello.txt
images/
    smile.gif
*/
```
License
-------

JSZip is dual-licensed. You may use it under the MIT license *or* the GPLv3
license. See [LICENSE.md](LICENSE.md).
