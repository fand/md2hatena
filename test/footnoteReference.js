import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(footnoteReference)', t => {
  const r = { type: 'footnoteReference', identifier: 'alpha' };
  t.is(nodeToHatena(r), '');
  t.is(nodeToHatena(r, {
    footnoteDefinition: {
      alpha: {
        type: 'footnoteDefinition',
        children: [
          { type: 'text', value: 'bravo' },
        ],
      },
    },
  }), '((bravo))');
});

test('md2hatena(footnoteReference)', async t => {
  t.is(await md2hatena('[^alpha]'), '');
  t.is(await md2hatena(dedent(`
    [^alpha]: bravo
    yay [^alpha] yay
  `)), 'yay ((bravo)) yay');
});
