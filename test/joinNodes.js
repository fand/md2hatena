import test from 'ava';
import joinNodes from '../src/joinNodes';

test('joinNodes', t => {
  const text = s => ({ type: 'text', value: s });
  const p = texts => ({ type: 'paragraph', children: texts.map(text) });
  const d = { type: 'definition' };

  t.is(joinNodes([], []), '');
  t.is(joinNodes([text('foo'), text('bar')], ['foo', 'bar']), 'foobar');
  t.is(joinNodes([p(['foo', 'bar']), p(['baz', 'qux'])], ['foobar', 'bazqux']), 'foobar\n\nbazqux');
  t.is(joinNodes([p(['foo', 'bar']), d, p(['baz', 'qux'])], ['foobar', '', 'bazqux']), 'foobar\n\nbazqux');
});
