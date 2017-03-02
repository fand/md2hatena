import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(emphasis)', t => {
  const emphasis = {
    type: 'paragraph',
    children: [
      {
        type: 'emphasis',
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
        type: 'emphasis',
        children: [{
          type: 'text',
          value: 'bravo',
        }],
      },
    ],
  };

  t.is(nodeToHatena(emphasis), '<em>alpha</em> <em>bravo</em>');
});

test('md2hatena(emphasis)', async t => {
  t.is(await md2hatena('*alpha* _bravo_'), '<em>alpha</em> <em>bravo</em>');
});
