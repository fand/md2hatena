import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(footnoteDefinition)', t => {
  t.is(nodeToHatena({ type: 'footnoteDefinition' }), '');
});

test('md2hatena(footnoteDefinition)', async t => {
  t.is(await md2hatena('[^alpha]: bravo and charlie.'), '');
});
