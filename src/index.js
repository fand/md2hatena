import remark from 'remark';
import nodeToHatena from './nodeToHatena';

export function md2hatena (md) {
  return remark().use(stringify).process(md).then(vfile => vfile.contents);
}

function compiler (tree) {
  return nodeToHatena(tree);
}

export function stringify () {
  this.Compiler = compiler;
}

export { nodeToHatena };
