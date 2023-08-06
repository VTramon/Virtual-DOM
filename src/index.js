import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";
import diff from "./vdom/diff.js";
import virtualize from "./vdom/virtualize.js";

// const createVapp = (count) =>
//   createElement("div", {
//     props: {
//       id: "app",
//       dataCount: count,
//     },
//     children: [
//       createElement("input"),
//       String(count),
//       createElement("img", {
//         props: {
//           src: "https://media4.giphy.com/media/eqLowZa79LwOI/giphy.webp",
//         },
//       }),
//     ],
//   });

// var count = 0;
// var vapp = createVapp(count);

// // render()

// const app = render(vapp);

// var rootEl = mount(app, document.getElementById("app"));

// var rootEl = app(document.getElementById("app"));

// var count = 0;

// setInterval(() => {
//   count++;
//   const newVapp = createVapp(count);
//   const patch = diff(newVapp, vapp);
//   rootEl = patch(rootEl);
//   vapp = newVapp;
// }, 1000);

// _________________________________________________
// _________________________________________________
// _________________________________________________

// countContainer.innerHTML = count;

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

// document.getElementById("increment_button").addEventListener("click", () => {
//   Increment();
// });

// const app = document.getElementById("app");

// var rootEl = mount(app, document.getElementById("root"));

setInterval(() => {
  setCount();
}, 1000);
