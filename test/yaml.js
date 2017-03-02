import test from 'ava';
import dedent from 'dedent';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(yaml)', t => {
  const yaml = {
    type: 'yaml',
    value: 'foo: bar',
  };

  t.is(nodeToHatena(yaml), dedent(`
    >|yaml|
    foo: bar
    ||<
  `));
});

test('md2hatena(yaml)', async t => {
  t.is(await md2hatena(dedent(`
    ---
    foo: bar
    ---
  `)), dedent(`
    >|yaml|
    foo: bar
    ||<
  `));
});
