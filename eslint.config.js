import eslint from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: [
            "vendor/*.js",
            "dist/*.js",
            "lib/index-min.js",
            "test/jquery-1.8.3.min.js"
        ]
    },
    eslint.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            indent: ["error", 4],
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            curly: "error",
            eqeqeq: "error",
            "no-new": "error",
            "no-caller": "error",
            "guard-for-in": "error",
            "no-extend-native": "error",
            "no-unused-vars": ["error", { caughtErrors: "none" }],
            "no-useless-assignment": "off",
            "no-unassigned-vars": "off",
            "preserve-caught-error": "off"
        }
    },
    {
        files: ["test/**/*.js"],
        languageOptions: {
            globals: {
                Benchmark: "readonly",
                JSZip: "readonly",
                JSZipUtils: "readonly",
                JSZipTestUtils: "readonly",
                QUnit: "readonly"
            }
        }
    },
    {
        files: ["documentation/**/*.js"],
        languageOptions: {
            globals: {
                $: "readonly",
                jQuery: "readonly",
                JSZip: "readonly",
                JSZipUtils: "readonly",
                saveAs: "readonly"
            }
        }
    }
];
