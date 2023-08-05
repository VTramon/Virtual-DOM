const renderElement = ({ tagName, props, children }) => {
  const element = document.createElement(tagName);

  for (const [k, v] of Object.entries(props)) {
    element.setAttribute(k, v);
  }

  for (var child of children) {
    child = render(child);
    element.appendChild(child);
  }

  return element;
};

const render = (vnode) => {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  return renderElement(vnode);
};

export default render;
