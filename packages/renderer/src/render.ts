import { CompositionMetadata, CompositionProps } from "@recodec/core";
import path from "path";
import puppeteer from "puppeteer";

export const render = async (props: RenderProps) => {
  const { entry, composition } = props;

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(`file://${path.resolve(__dirname, entry)}`);
  await page.evaluate(value => (window.compositionProps = value), composition);
  await page.setViewport({
    width: composition.metadata.width,
    height: composition.metadata.height
  });

  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, 2000)
  );

  const state = await page.evaluate(() => window.compositionState);
  // todo: use state to render video via ffmpeg

  await browser.close();
};

export interface RenderProps {
  entry: string;
  composition: CompositionProps;
  metadata: CompositionMetadata;
  configuration: {
    codec: "h264" | "mp3";
  };
  output: { file: string };
}
