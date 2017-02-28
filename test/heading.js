import test from 'ava';
import { nodeToHatena } from '../src';

test('nodeToHatena compiles node', t => {
  const node = { type: 'heading', children: [{ type: 'text', value: 'yo' }] };
  t.is(nodeToHatena({ ...node, depth: 1 }), '\n* yo\n');
  t.is(nodeToHatena({ ...node, depth: 2 }), '\n** yo\n');
  t.is(nodeToHatena({ ...node, depth: 3 }), '\n*** yo\n');
  t.is(nodeToHatena({ ...node, depth: 4 }), '\n**** yo\n');
  t.is(nodeToHatena({ ...node, depth: 5 }), '\n***** yo\n');
  t.is(nodeToHatena({ ...node, depth: 6 }), '\n****** yo\n');
});
