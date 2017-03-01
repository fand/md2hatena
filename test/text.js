import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(text)', t => {
  t.is(nodeToHatena({ type: 'text', value: 'yo' }), 'yo');
});

test('md2hatena(text)', async t => {
  t.is(await md2hatena('yo'), 'yo');
});
