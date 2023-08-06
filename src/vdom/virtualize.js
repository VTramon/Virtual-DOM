const virtualize = (node) => {
  if (node.nodeType === 3) {
    if (/[^\t\n\r ]/.test(node.textContent)) {
      return String(node.textContent);
    }
  }

  const children = [];
  if (node.nodeType === 1) {
    for (const child of node.childNodes) {
      if (
        (child.nodeType === 3 && /[^\t\n\r ]/.test(child.textContent)) ||
        child.nodeType === 1
      )
        children.push(virtualize(child));
    }

    const props = [];
    for (const prop of node.getAttributeNames()) {
      props.push([prop, node.getAttribute(prop)]);
    }

    const response = {
      tagName: node.tagName,
      props: Object.fromEntries(props),
      children: children,
    };

    return response;
  }
};

export default virtualize;
