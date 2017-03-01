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

const converter = {

  root (node) {
    return joinNodes(node.children);
  },

  heading (node) {
    return '**********'.slice(0, node.depth) + ' ' + node.children.map(nodeToHatena).join('');
  },

  text (node) {
    return node.value;
  },

  paragraph (node) {
    return joinNodes(node.children);
  },

  inlineCode (node) {
    return '<code>' + node.value + '</code>';
  },

  html (node) {
    return node.value;
  },

  thematicBreak (node) {
    return '<hr>';
  },

  link (node) {
    const title = node.children.map(nodeToHatena).join('');
    const suffix = title.match(/\S+/) ? `:title=${title}` : ':title';
    return `[${node.url}${suffix}]`;
  },

  list (node, opts) {
    const level = opts.level || 0;
    return node.children.map((n) => nodeToHatena(n, { level: level + 1 })).join('\n');
  },

  listItem (node, opts) {
    const level = opts.level || 0;
    return '----------'.slice(0, level) + ' ' + node.children.map(n => {
      const h = nodeToHatena(n, { level });
      return n.type === 'list' ? `\n${h}` : h;
    }).join('');
  },

  table (node) {
    return (
      nodeToHatena(node.children[0], { prefix: '*' }) + '\n' +
      node.children.slice(1).map(n => nodeToHatena(n)).join('\n')
    );
  },

  tableRow (node, opts) {
    return '| ' + node.children.map(n => (opts.prefix || '') + nodeToHatena(n)).join(' | ') + ' |';
  },

  tableCell (node) {
    return node.children.map(nodeToHatena).join('');
  },

  code (node) {
    return `>|${node.lang}|
${node.value}
||<`;
  },

};

export function nodeToHatena (node, opts = {}) {
  if (converter[node.type]) {
    return converter[node.type](node, opts);
  }

  return node.value || '';
}
