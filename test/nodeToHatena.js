import test from 'ava';
import { nodeToHatena } from '../src';

test('nodeToHatena', t => {
  t.is(nodeToHatena({ type: 'unknown' }), '', 'nodeToHatena returns empty string for unknown nodes');
});
