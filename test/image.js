import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(delete)', t => {
  const i = opts => nodeToHatena({
    type: 'image',
    url: 'http://example.com/favicon.ico',
    ...opts,
  });

  t.is(i({}), '[http://example.com/favicon.ico:image]');
  t.is(i({ alt: 'alpha' }), '<img src="http://example.com/favicon.ico" alt="alpha"/>');
  t.is(i({ title: 'bravo' }), '<img src="http://example.com/favicon.ico" title="bravo"/>');
  t.is(i({ alt: 'alpha', title: 'bravo' }), '<img src="http://example.com/favicon.ico" alt="alpha" title="bravo"/>');
});

test('md2hatena(image)', async t => {
  t.is(await md2hatena('![](http://example.com/favicon.ico)'), '[http://example.com/favicon.ico:image]');
  t.is(await md2hatena('![](http://example.com/favicon.ico "bravo")'), '<img src="http://example.com/favicon.ico" title="bravo"/>');
  t.is(await md2hatena('![alpha](http://example.com/favicon.ico)'), '<img src="http://example.com/favicon.ico" alt="alpha"/>');
  t.is(await md2hatena('![alpha](http://example.com/favicon.ico "bravo")'), '<img src="http://example.com/favicon.ico" alt="alpha" title="bravo"/>');
});
