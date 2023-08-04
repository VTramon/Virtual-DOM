import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";

const createVapp = (count) =>
  createElement("div", {
    props: {
      id: "app",
      dataCount: count,
    },
    children: [
      String(count),
      createElement("img", {
        props: {
          src: "https://media4.giphy.com/media/eqLowZa79LwOI/giphy.webp",
        },
      }),
    ],
  });

const vapp = createVapp(3);

const app = render(vapp);

mount(app, document.getElementById("root"));

// console.log(app);
