import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(linkReference)', t => {
  const r = { type: 'linkReference', identifier: 'alpha', referenceType: 'shortcut' };
  t.is(nodeToHatena(r), '');
  t.is(nodeToHatena(r, {
    definition: {
      alpha: 'http://example.com',
    },
  }), '[http://example.com]');
});

test('md2hatena(linkReference)', async t => {
  t.is(await md2hatena('[alpha]'), '');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay [bravo][alpha] yay
  `)), 'yay [http://example.com:title=bravo] yay');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay [alpha][] yay
  `)), 'yay [http://example.com] yay');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay [alpha] yay
  `)), 'yay [http://example.com] yay');
});
