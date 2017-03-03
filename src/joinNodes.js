const isBlockType = {
  heading: true,
  paragraph: true,
  html: true,
  yaml: true,
  list: true,
  table: true,
  code: true,
  thematicBreak: true,
  blockquote: true,
};

export default function joinNodes (nodes, results) {
  if (nodes.length === 0) {
    return '';
  }

  const items = [];
  let i = 0;
  while (i < nodes.length) {
    items.push(results[i]);
    if (isBlockType[nodes[i].type]) {
      let j = i + 1;
      while (nodes[j] && results[j] === '') {
        j++;
      }
      if (nodes[j] && isBlockType[nodes[j].type]) {
        items.push('\n\n');
      }
      i = j;
    } else {
      i++;
    }
  }

  return items.join('');
}
