import remark from 'remark';
import nodeToHatena from './nodeToHatena';

export function md2hatena (md) {
  return remark().use(stringify).process(md).then(vfile => vfile.contents);
}

export function stringify () {
  this.Compiler = function compiler(tree) {
    return nodeToHatena(tree);
  };
}

export { nodeToHatena };
