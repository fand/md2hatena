import remark from 'remark';
import p from 'pify';

export default function md2hatena (md) {
  return p(remark().use(stringify).process)(md).then(vfile => vfile.contents);
}

export function stringify () {
  this.Compiler = function compiler(tree) {
    return nodeToHatena(tree);
  };
}

export function nodeToHatena(node, opts = {}) {
  const level = opts.level || 0;

  switch (node.type) {
  case 'root':
    return node.children.map(nodeToHatena).join('');
  case 'heading':
    return '**********'.slice(0, node.depth) + ' ' + node.children.map(nodeToHatena).join('');
  case 'text':
    return node.value;
  case 'paragraph':
    return node.children.map(nodeToHatena).join('');
  case 'inlineCode':
    return '<code>' + node.value + '</code>';
  case 'html':
    return node.value;
  case 'thematicBreak':
    return '<hr>';
  case 'link':
    const title = node.children.map(nodeToHatena).join('');
    const suffix = title.match(/\S+/) ? `:title=${title}` : ':title';
    return `[${node.url}${suffix}]`;
  case 'list':
    return node.children.map((n) => nodeToHatena(n, { level: level + 1 })).join('');
  case 'listItem':
    return '----------'.slice(0, level) + ' ' + node.children.map(n => nodeToHatena(n, { level })).join('');
  case 'table':
    return (
      nodeToHatena(node.children[0], { prefix: '*' }) + '\n' +
      node.children.slice(1).map(n => nodeToHatena(n)).join('\n')
    );
  case 'tableRow':
    return '| ' + node.children.map(n => (opts.prefix || '') + nodeToHatena(n)).join(' | ') + ' |';
  case 'tableCell':
    return node.children.map(nodeToHatena).join('');
  case 'code':
    return `>|${node.lang}|
${node.value}
||<
`;
  default:
    return node.value || '';
  }
}
