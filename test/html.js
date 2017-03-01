import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(html)', t => {
  t.is(nodeToHatena({ type: 'html', value: '<br>' }), '<br>');
});

test('md2hatena(html)', async t => {
  t.is(await md2hatena('<br>'), '<br>');
});
