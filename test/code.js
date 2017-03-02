import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(code)', t => {
  const code = {
    type: 'code',
    lang: 'perl',
    value: dedent(`
      my $foo = qr/bar/;
    `),
  };
  t.is(nodeToHatena(code), dedent(`
    >|perl|
    my $foo = qr/bar/;
    ||<
  `));
});

test('md2hatena(code)', async t => {
  t.is(await md2hatena(dedent(`
    \`\`\`perl
    my $foo = qr/bar/;
    \`\`\`
  `)), dedent(`
    >|perl|
    my $foo = qr/bar/;
    ||<
  `));
});
