import diff from "./vdom/diff.js";
import virtualize from "./vdom/virtualize.js";

function setCount(type = "Increment") {
  if (type === "Decrement") {
    count--;
  } else {
    count++;
  }
  const vapp = virtualize(countContainer);
  vapp.props["data-count"] = String(count);
  vapp.children[0] = String(count);
  const patch = diff(vapp, virtualize(countContainer));

  countContainer = patch(countContainer);
}

function Decrement() {
  setCount("Decrement");
}

var count = 0;
var countContainer = document.getElementById("count");

document.getElementById("increment_button").addEventListener("click", () => {
  Decrement();
});

setInterval(() => {
  setCount();
}, 1000);
