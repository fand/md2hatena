import unified from 'unified';
import parse from 'remark-parse';
import nodeToHatena from './nodeToHatena';

export function md2hatena (md) {
  return unified().use(parse, { footnotes: true }).use(stringify).process(md).then(vfile => vfile.contents);
}

function compiler (tree) {
  return nodeToHatena(tree);
}

export function stringify () {
  this.Compiler = compiler;
}

export { nodeToHatena };
