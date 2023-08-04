export default (tagName, { props = {}, children = [] } = {}) => {
  return {
    tagName,
    props,
    children,
  };
};
