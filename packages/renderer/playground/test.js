const component = (...args) =>
  import("../example-bundle/bundle.js").then(({ default: component }) =>
    component(...args)
  );

component({ foo: "bar" }).then(result => {
  console.log("result", result);
});

// const { render } = require("../dist");

// render({
//   input: { file: "../example-bundle/bundle.mjs" },
//   composition: { codec: "h264", props: { foo: "bar" } },
//   output: { file: "" }
// });
