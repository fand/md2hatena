import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(blockquote)', t => {
  const code = {
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        value: 'Alpha bravo charlie.',
      }],
    }],
  };

  t.is(nodeToHatena(code), dedent(`
    >>
    Alpha bravo charlie.
    <<
  `));
});

test('md2hatena(blockquote)', async t => {
  t.is(await md2hatena(dedent(`
    > Alpha bravo charlie.
  `)), dedent(`
    >>
    Alpha bravo charlie.
    <<
  `));
});
