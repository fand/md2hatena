const remark = require('remark');
const fs = require('fs');
const p = require('pify');
const md2hatena = require('../lib/md2hatena');

p(fs.readFile)(process.argv[2], 'utf8')
  .then(p(remark().use(md2hatena).process))
  .then((data) => {
    console.log(data.contents);
  })
  .catch((err) => {
    console.log('ERROR: failed to compile markdown file');
    console.error(err);
  });
