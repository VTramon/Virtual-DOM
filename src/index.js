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
// const vapp = createVapp(count);

// const app = diff(vapp);

// var rootEl = app(document.getElementById("app"));

const root = document.getElementById("app");

console.log(virtualize(root));

// console.log(root.nodeType);

// var rootEl = mount(app, document.getElementById("root"));
// var rootEl = mount(app, document.getElementById("root"));

// setInterval(() => {
//   count++;
//   const vNewApp = createVapp(count);
//   const patch = diff(vapp, vNewApp);

//   rootEl = patch(rootEl);
// }, 1000);
