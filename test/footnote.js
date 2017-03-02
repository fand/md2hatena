import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(footnote)', t => {
  const footnote = {
    type: 'footnote',
    children: [{
      type: 'text',
      value: 'alpha bravo',
    }],
  };

  t.is(nodeToHatena(footnote), '((alpha bravo))');
});

test('md2hatena(footnote)', async t => {
  t.is(await md2hatena('[^alpha bravo]'), '((alpha bravo))');
});
