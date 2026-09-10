---
title: "How to read a file"
layout: default
section: example
---

This page explains how to read an existing zip file or add a existing file into
the zip file.


### In the browser

#### AJAX request

Getting binary data with an ajax request is hard (mainly because of IE <= 9).
The easy way is to use [JSZipUtils.getBinaryContent](https://github.com/stuk/jszip-utils).
With JSZipUtils.getBinaryContent, you can do the following (see the
documentation for more examples) :

```js
JSZipUtils.getBinaryContent('path/to/content.zip', function(err, data) {
    if(err) {
        throw err; // or handle err
    }

    JSZip.loadAsync(data).then(function () {
        // ...
    });
});

// or, with promises:

new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent('path/to/content.zip', function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
}).then(function (data) {
    return JSZip.loadAsync(data);
})
.then(...)
```

<br>

If you need to adapt an existing solution to what getBinaryContent does, here
are the details. When doing a XHR request (level 1, without setting the
`responseType`) the browser will try to interpret the response as a string and
decode it from its charset. To avoid this on Firefox/Chrome/Opera, you need to
set mime type : `xhr.overrideMimeType("text/plain; charset=x-user-defined");`.
On IE <= 9, this is harder. The overrideMimeType trick doesn't work so we need
to use [vbscript](http://stackoverflow.com/questions/1095102/how-do-i-load-binary-image-data-using-javascript-and-xmlhttprequest)
and non standard attributes.
On IE > 9, overrideMimeType doesn't work but xhr2 does.

With [xhr 2](http://caniuse.com/xhr2), you can just set the responseType
attribute : `xhr.responseType = "arraybuffer";`. With this, the browser will
return an ArrayBuffer.

#### Local files

If the browser supports the [FileReader API](http://caniuse.com/filereader),
you can use it to read a zip file. JSZip can read ArrayBuffer, so you can use
`FileReader.readAsArrayBuffer(Blob)`, see this [example]({{site.baseurl}}/documentation/examples/read-local-file-api.html).

### In nodejs

JSZip can read Buffers so you can do the following :

#### Local file

```js
import fs from "node:fs";
import JSZip from "@node-projects/jszip";

// read a zip file
fs.readFile("test.zip", function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
        // ...
    });
});
// or
new Promise(function (resolve, reject) {
    fs.readFile("test.zip", function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
}).then(function (data) {
    return JSZip.loadAsync(data);
})
.then(...)


// read a file and add it to a zip
fs.readFile("picture.png", function(err, data) {
    if (err) throw err;
    var zip = new JSZip();
    zip.file("picture.png", data);
});
// or
var contentPromise = new Promise(function (resolve, reject) {
    fs.readFile("picture.png", function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});
zip.file("picture.png", contentPromise);


// read a file as a stream and add it to a zip
var stream = fs.createReadStream("picture.png");
zip.file("picture.png", stream);
```

#### Remote file

Modern Node.js provides `fetch`. Download the response as an `ArrayBuffer` and
pass it directly to JSZip.

##### With fetch:

```js
import JSZip from "@node-projects/jszip";

const response = await fetch("http://localhost/.../file.zip");
if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
}

const zip = await JSZip.loadAsync(await response.arrayBuffer());
const text = await zip.file("content.txt").async("string");
console.log(text);
```
