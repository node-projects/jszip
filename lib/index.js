import object from "./object.js";
import load from "./load.js";
import support from "./support.js";
import defaults from "./defaults.js";

export class JSZip extends object {

    /**
     * Representation a of zip file in js
     * @constructor
     */
    constructor() {
        super();

        // if this constructor is used without `new`, it adds `new` before itself:
        if (!(this instanceof JSZip)) {
            return new JSZip();
        }

        if (arguments.length) {
            throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        }

        // object containing the files :
        // {
        //   "folder/" : {...},
        //   "folder/data.txt" : {...}
        // }
        // NOTE: we use a null prototype because we do not
        // want filenames like "toString" coming from a zip file
        // to overwrite methods and attributes in a normal Object.
        this.files = Object.create(null);

        this.comment = null;

        // Where we are in the hierarchy
        this.root = "";
        this.clone = function () {
            var newObj = new JSZip();
            for (var i in this) {
                if (typeof this[i] !== "function") {
                    newObj[i] = this[i];
                }
            }
            return newObj;
        };
    }

    static support = support;
    static defaults = defaults;

    // TODO find a better way to handle this version,
    // a require('package.json').version doesn't work with webpack, see #327
    static version = "4.1.1";

    loadAsync(content, options) {
        return load(this, content, options);
    };

    static loadAsync(content, options) {
        return new JSZip().loadAsync(content, options);
    };
}

export default JSZip;
