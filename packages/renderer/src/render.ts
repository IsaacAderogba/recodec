import { JSDOM } from "jsdom";
import path from "path";
import { render as renderDOM } from "@testing-library/react";

export interface RenderProps {
  input: {
    file: string;
  };
  composition: {
    codec: "h264" | "mp3";
    props: Record<string, any>;
  };
  output: {
    file: string;
  };
}

const importComponent =
  (path: string) =>
  (...args: any[]) => {
    return import(path).then(({ default: component }) => component(...args));
  };

export const render = async (props: RenderProps) => {
  const { input, composition, output } = props;

  const component = importComponent(path.resolve(__dirname, input.file));
  const dom = new JSDOM("");

  const previousWindow = global.window;
  const previousDocument = global.document;

  global.window = dom.window as any;
  global.document = dom.window.document;

  renderDOM(await component(composition.props), {});

  global.window = previousWindow;
  global.document = previousDocument;
};

render({
  input: { file: "../example-bundle/bundle.js" },
  composition: { codec: "h264", props: { foo: "bar" } },
  output: { file: "" }
});
