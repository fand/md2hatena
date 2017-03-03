#!/usr/bin/env node
const fs = require('fs');
const p = require('pify');
const { md2hatena } = require('../lib');
const meow = require('meow');
const usage = `
  Usage
    $ md2hatena <input>

  Example
    $ md2hatena foo.md > bar.hatena
`;
const cli = meow(usage);

if (!cli.input[0]) {
  cli.showHelp(-1);
}

p(fs.readFile)(cli.input[0], 'utf8')
  .then(md2hatena)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('ERROR: failed to compile markdown file');
    console.error(err);
    process.exit(-1);
  });
