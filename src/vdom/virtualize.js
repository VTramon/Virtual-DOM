const virtualize = (node) => {
  if (node.nodeType === 3) {
    return String(node);
  }

  const children = [];

  for (const child of node.childNodes) {
    if (
      child.nodeType === 1 ||
      (child.nodeType === 3 && !/[^\t\n\r ]/.test(node.textContent))
    ) {
      children.push(virtualize(child));
    }
  }

  const response = {
    tagName: node.tagName,
    props: Object.assign({}, node.getAttributeNames()),
    children: children,
  };

  //   console.log(response);
  return response;
};

export default virtualize;
