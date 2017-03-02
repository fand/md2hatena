import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(definition)', t => {
  t.is(nodeToHatena({ type: 'definition' }), '');
});

test('md2hatena(definition)', async t => {
  t.is(await md2hatena('[alpha]: http://example.com'), '');
});
