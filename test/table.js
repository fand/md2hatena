import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(table)', t => {
  const text = t => ({ type: 'text', value: t });
  const c = t => ({ type: 'tableCell', children: [text(t)] });
  const table = {
    type: 'table',
    children: [
      { type: 'tableRow', children: [c('foo'), c('bar'), c('baz')] },
      { type: 'tableRow', children: [c('aaa'), c('bbb'), c('ccc')] },
    ],
  };
  t.is(nodeToHatena(table), dedent(`
    | *foo | *bar | *baz |
    | aaa | bbb | ccc |
  `));
});

test('md2hatena(table)', async t => {
  t.is(await md2hatena(dedent(`
    | foo | bar | baz |
    |:----|:---:|----:|
    | aaa | bbb | ccc |
  `)), dedent(`
    | *foo | *bar | *baz |
    | aaa | bbb | ccc |
  `));
});
