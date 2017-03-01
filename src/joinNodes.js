const isBlockType = {
  heading       : true,
  paragraph     : true,
  html          : true,
  list          : true,
  table         : true,
  code          : true,
  thematicBreak : true,
};

export default function joinNodes (nodes, results) {
  if (nodes.length === 0) { return ''; }

  const items = [results[0]];
  const [i, j] = [0, 1];
  for (let [i, j] = [0, 1]; j < nodes.length; i++, j++) {
    if (isBlockType[nodes[i].type] && isBlockType[nodes[j].type]) {
      items.push('\n\n');
    }
    items.push(results[j]);
  }

  return items.join('');
}
