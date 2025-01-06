import { Composition } from "@recodec/core";
import path from "path";
import puppeteer from "puppeteer";

export const render = async (props: RenderProps) => {
  const { entry, composition } = props;

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(`file://${path.resolve(__dirname, entry)}`);
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

export interface RenderProps {
  entry: string;
  composition: Composition;
  configuration: {
    codec: "h264" | "mp3";
  };
  output: { file: string };
}
