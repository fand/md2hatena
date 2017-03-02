import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(strong)', t => {
  const strong = {
    type: 'paragraph',
    children: [
      {
        type: 'strong',
        children: [{
          type: 'text',
          value: 'alpha',
        }],
      },
      {
        type: 'text',
        value: ' ',
      },
      {
        type: 'strong',
        children: [{
          type: 'text',
          value: 'bravo',
        }],
      },
    ],
  };

  t.is(nodeToHatena(strong), '<strong>alpha</strong> <strong>bravo</strong>');
});

test('md2hatena(strong)', async t => {
  t.is(await md2hatena('**alpha** __bravo__'), '<strong>alpha</strong> <strong>bravo</strong>');
});
