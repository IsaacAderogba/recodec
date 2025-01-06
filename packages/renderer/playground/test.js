const component = (...args) =>
  import("../example-bundle/bundle.mjs").then(({ default: component }) =>
    component(...args)
  );

component({ foo: "bar" }).then(result => {
  console.log("result", result);
});
