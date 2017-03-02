import unified from 'unified';
import parse from 'remark-parse';
import nodeToHatena from './nodeToHatena';

export function md2hatena (md) {
  return unified().use(parse, { footnotes: true }).use(stringify).process(md).then(vfile => vfile.contents);
}

function findInTree (node, type) {
  let nodes = [];
  if (node.children) {
    nodes = node.children.reduce((acc, n) => acc.concat(findInTree(n, type)), []);
  }
  if (node.type === type) {
    nodes.push(node);
  }
  return nodes;
}

function getDefinition (tree) {
  const definition = {};
  const footnoteDefinition = {};

  findInTree(tree, 'definition').forEach(n => {
    definition[n.identifier] = n.url;
  });
  findInTree(tree, 'footnoteDefinition').forEach(n => {
    footnoteDefinition[n.identifier] = n;
  });

  return { definition, footnoteDefinition };
}

function compiler (tree) {
  return nodeToHatena(tree, getDefinition(tree));
}

export function stringify () {
  this.Compiler = compiler;
}

export { nodeToHatena };
