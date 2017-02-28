import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(paragraph)', t => {
  const node = { type: 'text', value: 'yo' };
  t.is(nodeToHatena({ type: 'paragraph', children: [node, node] }), 'yoyo\n');
});

test('md2hatena(paragraph)', async t => {
  t.is(await md2hatena('\nyo\n'), 'yo\n');
});
