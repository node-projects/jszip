---
title: Contributing
layout: default
section: main
---


### Download the sources

You should create a [GitHub](https://github.com/) account and
[fork the repository](https://help.github.com/articles/fork-a-repo) (you will
need one to create the pull request).

If you just want the get the source code, you can use git and do
`git clone https://github.com/node-projects/jszip.git` to get the sources. You
can also download the latest sources from the repository's main branch.

### Building the project

#### Code

The dependencies are handled by npm. Run `npm install` first.

The main development commands are:

* `npm run build` generates the minified ESM package bundle.
* `npm run build-browser` generates `dist/jszip.js` and `dist/jszip.min.js`
  with esbuild for browser tests and manual browser use.
* `npm run test-node` runs the Node.js tests.
* `npm run test-browser` builds and runs the Playwright browser tests.
* `npm test` runs Node.js tests, browser tests, and the TypeScript check.
* `npm run lint` checks the source with ESLint.

#### Documentation

The documentation uses jekyll on gh-pages. To render the documentation, you
need to [install jekyll](http://jekyllrb.com/docs/installation/) and then run
`jekyll serve --baseurl ''`.

### Testing the project

To test JSZip in Node.js, use `npm run test-node`.

Install the Playwright browsers once with `npx playwright install`, then use
`npm run test-browser`. The suite runs Chromium, Firefox, and WebKit by default.
To select installed browsers locally, set `PLAYWRIGHT_BROWSERS` to a
comma-separated list, for example `PLAYWRIGHT_BROWSERS=chromium`.

For interactive testing, run `npm run build-browser`, start `npm start`, and
open `/test/` in the browser.

### Merging the changes

If you have tested bug fixes or new features, you can open a
[pull request](https://docs.github.com/en/pull-requests) on GitHub.

## Releasing a new version

1. Run `npm test` and `npm run lint`.
2. Update the version in `package.json`, `lib/index.js`, and `index.html`.
3. Update `CHANGES.md`.
4. Run `npm run build` and commit the generated `lib/index-min.js`.
5. Run `npm version ...`, where `...` is `major`, `minor`, or `patch`.
6. Run `npm publish`.
