import test from 'ava';
import md2hatena, { nodeToHatena } from '../src';
import 'babel-polyfill';

test('nodeToHatena compiles node', t => {
  const node = { type: 'heading', children: [{ type: 'text', value: 'yo' }] };
  t.is(nodeToHatena({ ...node, depth: 1 }), '* yo');
  t.is(nodeToHatena({ ...node, depth: 2 }), '** yo');
  t.is(nodeToHatena({ ...node, depth: 3 }), '*** yo');
  t.is(nodeToHatena({ ...node, depth: 4 }), '**** yo');
  t.is(nodeToHatena({ ...node, depth: 5 }), '***** yo');
  t.is(nodeToHatena({ ...node, depth: 6 }), '****** yo');
});

test('md2hatena compiles string', async t => {
  t.is(await md2hatena('# yo'), '* yo');
  t.is(await md2hatena('## yo'), '** yo');
  t.is(await md2hatena('### yo'), '*** yo');
  t.is(await md2hatena('#### yo'), '**** yo');
  t.is(await md2hatena('##### yo'), '***** yo');
  t.is(await md2hatena('###### yo'), '****** yo');
});
