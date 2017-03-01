import remark from 'remark';
import p from 'pify';

export function md2hatena (md) {
  return p(remark().use(stringify).process)(md).then(vfile => vfile.contents);
}

export function stringify () {
  this.Compiler = function compiler(tree) {
    return nodeToHatena(tree);
  };
}

const isBlockType = {
  heading   : true,
  paragraph : true,
  html      : true,
  list      : true,
  table     : true,
  code      : true,
};

function joinNodes (nodes) {
  if (nodes.length === 0) { return ''; }

  const items = [nodeToHatena(nodes[0])];
  const [i, j] = [0, 1];
  for (let [i, j] = [0, 1]; j < nodes.length; i++, j++) {
    if (isBlockType[nodes[i].type] && isBlockType[nodes[j].type]) {
      items.push('\n\n');
    }
    items.push(nodeToHatena(nodes[j]));
  }

  return items.join('');
}

export function nodeToHatena (node, opts = {}) {
  const level = opts.level || 0;

  switch (node.type) {
  case 'root':
    return joinNodes(node.children);
  case 'heading':
    return '**********'.slice(0, node.depth) + ' ' + node.children.map(nodeToHatena).join('');
  case 'text':
    return node.value;
  case 'paragraph':
    return joinNodes(node.children);
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
    return node.children.map((n) => nodeToHatena(n, { level: level + 1 })).join('\n');
  case 'listItem':
    return '----------'.slice(0, level) + ' ' + node.children.map(n => {
      const h = nodeToHatena(n, { level });
      return n.type === 'list' ? `\n${h}` : h;
    }).join('');
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
||<`;
  default:
    return node.value || '';
  }
}
