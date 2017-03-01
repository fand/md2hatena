# md2hatena

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
