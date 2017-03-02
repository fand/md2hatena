import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(delete)', t => {
  const delete_ = {
    type: 'delete',
    children: [{
      type: 'text',
      value: 'alpha',
    }],
  };

  t.is(nodeToHatena(delete_), '<del>alpha</del>');
});

test('md2hatena(delete)', async t => {
  t.is(await md2hatena('~~alpha~~'), '<del>alpha</del>');
});
