import test from 'ava';
import joinNodes from '../src/joinNodes';

test('joinNodes', t => {
  const text = s => ({ type: 'text', value: s });
  const p = texts => ({ type: 'paragraph', children: texts.map(text) });
  const d = { type: 'definition' };
  const ul = texts => ({
    type: 'list',
    ordered: true,
    start: 1,
    loose: false,
    children: texts.map(text => ({
      type: 'listItem',
      loose: false,
      checked: true,
      children: [p([text])]
    })),
  });
  const h2 = body => ({
    type: 'heading',
    depth: 1,
    children: [text(body)],
  });

  t.is(joinNodes([], []), '');
  t.is(joinNodes([text('foo'), text('bar')], ['foo', 'bar']), 'foobar');
  t.is(joinNodes([p(['foo', 'bar']), p(['baz', 'qux'])], ['foobar', 'bazqux']), 'foobar\n\nbazqux');
  t.is(joinNodes([p(['foo', 'bar']), d, p(['baz', 'qux'])], ['foobar', '', 'bazqux']), 'foobar\n\nbazqux');
  t.is(joinNodes([ul(['foo', 'bar']), h2('baz')], ['-foo\n-bar', '**baz']), '-foo\n-bar\n\n**baz');
});
