import path from "path";
import puppeteer from "puppeteer";

export const render = async (props: RenderProps) => {
  const { input, composition } = props;

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(`file://${path.resolve(__dirname, input.path)}`);
  await page.evaluate(value => (window.composition = value), composition);
  await page.setViewport({
    width: composition.metadata.width,
    height: composition.metadata.height
  });

  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, 2000)
  );
  console.log(
    "composition state",
    await page.evaluate(() => window.compositionState)
  );

  await browser.close();
};

render({
  input: { path: "../example-bundle/index.html" },
  composition: {
    codec: "h264",
    props: { foo: "bar" },
    metadata: { width: 1920, height: 1080, fps: 30, durationInFrames: 150 }
  },
  output: { path: "" }
});

export interface RenderProps {
  input: { path: string };
  composition: Composition;
  output: { path: string };
}

interface Composition {
  codec: "h264" | "mp3";
  props: Record<string, any>;
  metadata: {
    fps: number;
    durationInFrames: number;
    height: number;
    width: number;
  };
}

interface CompositionState {
  codec: "h264" | "mp3";
  props: Record<string, any>;
  metadata: {
    fps: number;
    durationInFrames: number;
    height: number;
    width: number;
  };
}

declare global {
  interface Window {
    composition: Composition;
    compositionState: CompositionState;
  }
}
