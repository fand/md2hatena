import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(break)', t => {
  const break_ = {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        value: 'foo',
      },
      {
        type: 'break',
      },
      {
        type: 'text',
        value: 'bar',
      },
    ],
  };

  t.is(nodeToHatena(break_), dedent(`
    foo
    bar
  `));
});

test('md2hatena(break)', async t => {
  t.is(await md2hatena(dedent(`
    foo\u0020\u0020
    bar
  `)), dedent(`
    foo
    bar
  `));
});
