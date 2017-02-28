import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(inlineCode)', t => {
  t.is(nodeToHatena({ type: 'inlineCode', value: 'foo' }), ' <code>foo</code> ');
});

test('md2hatena(inlineCode)', async t => {
  t.is(await md2hatena('`foo`'), ' <code>foo</code> \n');
});
