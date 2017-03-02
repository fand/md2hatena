# md2hatena

[![Build Status](http://img.shields.io/travis/fand/md2hatena.svg?style=flat-square)](https://travis-ci.org/fand/md2hatena)
[![NPM Version](https://img.shields.io/npm/v/md2hatena.svg?style=flat-square)](https://www.npmjs.com/package/md2hatena)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://fand.mit-license.org/)
[![Coverage Status](https://img.shields.io/coveralls/fand/md2hatena.svg?style=flat-square)](https://coveralls.io/github/fand/md2hatena?branch=master)

> Markdown to Hatena Syntax (はてな記法) converter.

![example](https://cloud.githubusercontent.com/assets/1403842/23490546/8d97a4bc-ff3c-11e6-8514-20af7e062710.gif)

## Install
`npm i -g md2hatena`

## Usage
`md2hatena` can be used in 4 ways:

- As a CLI command
- As a Atom command in [language-hatena](https://atom.io/packages/language-hatena) package
- As a library
- As a [remark](https://github.com/wooorm/remark) plugin

### As a CLI command
`$ md2hatena foo.md > foo.hatena`

### As a Atom command in language-hatena package
`Language Hatena: Convert Markdown To Hatena Syntax` command is available in [language-hatena](https://atom.io/packages/language-hatena) package.

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
