import joinNodes from './joinNodes';

const converter = {

  root (node, opts) {
    return joinNodes(node.children, node.children.map(n => nodeToHatena(n, opts)));
  },

  heading (node, opts) {
    return '**********'.slice(0, node.depth) + ' ' + node.children.map(n => nodeToHatena(n, opts)).join('');
  },

  text (node) {
    return node.value;
  },

  paragraph (node, opts) {
    return joinNodes(node.children, node.children.map(n => nodeToHatena(n, opts)));
  },

  inlineCode (node) {
    return '<code>' + node.value + '</code>';
  },

  html (node) {
    return node.value;
  },

  thematicBreak () {
    return '<hr>';
  },

  link (node, opts) {
    const title = node.children.map(n => nodeToHatena(n, opts)).join('');
    const suffix = title.match(/\S+/) ? `:title=${title}` : ':title';
    return `[${node.url}${suffix}]`;
  },

  list (node, opts) {
    const level = opts.level || 0;
    return node.children.map(n => nodeToHatena(n, { ...opts, level: level + 1 })).join('\n');
  },

  listItem (node, opts) {
    const level = opts.level || 0;
    return '----------'.slice(0, level) + ' ' + node.children.map(n => {
      const h = nodeToHatena(n, { ...opts, level });
      return n.type === 'list' ? `\n${h}` : h;
    }).join('');
  },

  table (node, opts) {
    return (
      nodeToHatena(node.children[0], { prefix: '*' }) + '\n' +
      node.children.slice(1).map(n => nodeToHatena(n, opts)).join('\n')
    );
  },

  tableRow (node, opts) {
    return '| ' + node.children.map(n => (opts.prefix || '') + nodeToHatena(n, opts)).join(' | ') + ' |';
  },

  tableCell (node, opts) {
    return node.children.map(n => nodeToHatena(n, opts)).join('');
  },

  code (node) {
    return `>|${node.lang}|
${node.value}
||<`;
  },

  blockquote (node, opts) {
    return `>>
${joinNodes(node.children, node.children.map(n => nodeToHatena(n, opts)))}
<<`;
  },

  yaml (node) {
    return `>|yaml|
${node.value}
||<`;
  },

  break () {
    return '\n';
  },

  emphasis (node, opts) {
    return `<em>${node.children.map(n => nodeToHatena(n, opts)).join('')}</em>`;
  },

  strong (node, opts) {
    return `<strong>${node.children.map(n => nodeToHatena(n, opts)).join('')}</strong>`;
  },

  delete (node, opts) {
    return `<del>${node.children.map(n => nodeToHatena(n, opts)).join('')}</del>`;
  },

  image (node) {
    if (node.alt && node.title) {
      return `<img src="${node.url}" alt="${node.alt}" title="${node.title}"/>`;
    }
    if (node.alt) {
      return `<img src="${node.url}" alt="${node.alt}"/>`;
    }
    if (node.title) {
      return `<img src="${node.url}" title="${node.title}"/>`;
    }
    return `[${node.url}:image]`;
  },

  footnote (node, opts) {
    return `((${node.children.map(n => nodeToHatena(n, opts)).join('')}))`;
  },

  footnoteDefinition () {
    return '';
  },

  footnoteReference (node, opts) {
    if (!opts.footnoteDefinition) {
      return '';
    }

    const def = opts.footnoteDefinition[node.identifier];
    if (def) {
      const body = def.children.map(n => nodeToHatena(n, opts)).join('');
      return `((${body}))`;
    }
    return '';
  },

  definition () {
    return '';
  },

  linkReference (node, opts) {
    if (!opts.definition || !opts.definition[node.identifier]) {
      return '';
    }

    const def = opts.definition[node.identifier];
    if (node.referenceType === 'full') {
      return `[${def}:title=${node.children.map(n => nodeToHatena(n, opts)).join('')}]`;
    }
    return `[${def}]`;
  },

  imageReference (node, opts) {
    if (!opts.definition || !opts.definition[node.identifier]) {
      return '';
    }

    const def = opts.definition[node.identifier];
    if (node.referenceType === 'full') {
      return `<img src="${def}" alt="${node.alt}"/>`;
    }
    return `[${def}:image]`;
  },

};

export default function nodeToHatena (node, opts = {}) {
  if (converter[node.type]) {
    return converter[node.type](node, opts);
  }

  return node.value || '';
}
