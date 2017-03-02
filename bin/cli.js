#!/usr/bin/env node
const fs = require('fs');
const p = require('pify');
const { md2hatena } = require('../lib');

p(fs.readFile)(process.argv[2], 'utf8')
  .then(md2hatena)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log('ERROR: failed to compile markdown file');
    console.error(err);
  });
