import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(link)', t => {
  const n = { type: 'text', value: 'foo' }
  t.is(nodeToHatena({ type: 'link', url: '//example.com', children: [] }), '[//example.com:title]');
  t.is(nodeToHatena({ type: 'link', url: '//example.com', children: [n] }), '[//example.com:title=foo]');
});

test('md2hatena(link)', async t => {
  t.is(await md2hatena('[](//example.com)'), '[//example.com:title]\n');
  t.is(await md2hatena('[foo](//example.com)'), '[//example.com:title=foo]\n');
});
