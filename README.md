# md2hatena

[![Build Status](http://img.shields.io/travis/fand/md2hatena.svg?style=flat-square)](https://travis-ci.org/fand/md2hatena)
[![NPM Version](https://img.shields.io/npm/v/md2hatena.svg?style=flat-square)](https://www.npmjs.com/package/md2hatena)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://fand.mit-license.org/)
[![Coverage Status](https://img.shields.io/coveralls/fand/md2hatena.svg?style=flat-square)](https://coveralls.io/github/fand/md2hatena?branch=master)

> Markdown to Hatena Syntax (はてな記法) converter.

## Install
`npm i -g md2hatena`

## Usage
`md2hatena` can be used in 3 ways:

- As a CLI command
- As a library
- As a [remark](https://github.com/wooorm/remark) plugin

### As a CLI command
`$ md2hatena foo.md > foo.hatena`

### As a library
```js
import fs from 'fs';
import { md2hatena } from 'md2hatena';

const md = fs.readFileSync('foo.md', 'utf8');
md2hatena(md).then((hatena) => {
  console.log(hatena);
})
```

### As a remark plugin
```js
import remark from 'remark';
import { stringify } from 'md2hatena';

remark().use(stringify).process(md, (vfile) => {
  console.log(vfile.contents);
});
```
