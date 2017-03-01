import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(thematicBreak)', t => {
  t.is(nodeToHatena({ type: 'thematicBreak' }), '<hr>');
});

test('md2hatena(thematicBreak)', async t => {
  t.is(await md2hatena('---'), '<hr>');
});
