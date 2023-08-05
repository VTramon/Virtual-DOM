import render from "./render.js";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffProps = (oldProps, newProps) => {
  const patches = [];

  for (const [k, v] of Object.entries(newProps)) {
    patches.push(($node) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  //   for (const [k, v] of Object.entries(oldProps)) {
  //     if (!(k in newProps)) {
  //       patches.push(($node) => {
  //         $node.removeAttribute(k);
  //         return $node;
  //       });
  //     }
  //   }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];

  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches = [];

  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(additionalVChild));
    });
    return $node;
  }

  return ($parent) => {
    for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

const diff = (vNewNode, vOldNode = undefined) => {
  if (vNewNode === undefined) {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  if (vOldNode === undefined || vOldNode.tagName !== vNewNode.tagName) {
    return ($node) => {
      const newNode = render(vNewNode);
      $node.replaceWith(newNode);
      return newNode;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node) => {
        const newNode = render(vNewNode);
        $node.replaceWith(newNode);
        return newNode;
      };
    } else {
      return ($node) => undefined;
    }
  }

  //   console.log(vNewNode);
  const patchProps = diffProps(vOldNode.props, vNewNode.props);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchProps($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
