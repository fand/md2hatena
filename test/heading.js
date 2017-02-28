import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena compiles node', t => {
  const node = { type: 'heading', children: [{ type: 'text', value: 'yo' }] };
  t.is(nodeToHatena({ ...node, depth: 1 }), '\n* yo\n');
  t.is(nodeToHatena({ ...node, depth: 2 }), '\n** yo\n');
  t.is(nodeToHatena({ ...node, depth: 3 }), '\n*** yo\n');
  t.is(nodeToHatena({ ...node, depth: 4 }), '\n**** yo\n');
  t.is(nodeToHatena({ ...node, depth: 5 }), '\n***** yo\n');
  t.is(nodeToHatena({ ...node, depth: 6 }), '\n****** yo\n');
});

test('md2hatena compiles string', async t => {
  t.is(await md2hatena('# yo'), '\n* yo\n');
  t.is(await md2hatena('## yo'), '\n** yo\n');
  t.is(await md2hatena('### yo'), '\n*** yo\n');
  t.is(await md2hatena('#### yo'), '\n**** yo\n');
  t.is(await md2hatena('##### yo'), '\n***** yo\n');
  t.is(await md2hatena('###### yo'), '\n****** yo\n');
});
