import test from 'ava';
import { md2hatena, nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena(list)', t => {
  const text = t => ({ type: 'text', value: t });
  const p = t => ({ type: 'paragraph', children: [text(t)] });
  const list = {
    type: 'list',
    children: [
      { type: 'listItem', children: [p('foo')] },
      { type: 'listItem', children: [
        text('bar'),
        {
          type: 'list',
          children: [
            { type: 'listItem', children: [p('baz')] },
          ],
        },
      ] },
    ],
  };
  t.is(nodeToHatena(list), '- foo\n- bar\n-- baz');
});

test('md2hatena(list)', async t => {
  t.is(await md2hatena('- foo\n- bar\n  - baz'), '- foo\n- bar\n-- baz');
});

test('md2hatena(ordered list)', async t => {
  const text = t => ({ type: 'text', value: t });
  const p = t => ({ type: 'paragraph', children: [text(t)] });
  const list = {
    type: 'list',
    ordered: true,
    children: [
      { type: 'listItem', children: [p('foo')] },
      { type: 'listItem', children: [
        text('bar'),
        {
          type: 'list',
          ordered: true,
          children: [
            { type: 'listItem', children: [p('baz')] },
          ],
        },
      ] },
    ],
  };
  t.is(nodeToHatena(list), '+ foo\n+ bar\n++ baz');
});

test('md2hatena(ordered list)', async t => {
  t.is(await md2hatena('1. foo\n1. bar\n  1. baz'), '+ foo\n+ bar\n++ baz');
});
