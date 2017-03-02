import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(imageReference)', t => {
  const r = { type: 'imageReference', identifier: 'alpha', referenceType: 'shortcut' };
  t.is(nodeToHatena(r), '');
  t.is(nodeToHatena(r, {
    definition: {
      alpha: 'http://example.com',
    },
  }), '[http://example.com:image]');
});

test('md2hatena(imageReference)', async t => {
  t.is(await md2hatena('![alpha]'), '');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay ![bravo][alpha] yay
  `)), 'yay <img src="http://example.com" alt="bravo"/> yay');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay ![alpha][] yay
  `)), 'yay [http://example.com:image] yay');
  t.is(await md2hatena(dedent(`
    [alpha]: http://example.com
    yay ![alpha] yay
  `)), 'yay [http://example.com:image] yay');
});
