import { CompositionProps, CompositionState } from "@recodec/core";
import path from "path";
import puppeteer from "puppeteer";
import { renderComposition, RenderCompositionProps } from "./ffmpeg";

export interface RenderProps
  extends Omit<RenderCompositionProps, "composition"> {
  entry: string;
  composition: CompositionProps;
}

export const render = async (props: RenderProps) => {
  const { entry, composition, metadata } = props;

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(`file://${path.resolve(process.cwd(), entry)}`);
  await page.evaluate(value => {
    window.compositionProps = value || {};
  }, composition);
  await page.setViewport({ width: metadata.width, height: metadata.height });

  const state = await new Promise<CompositionState>(resolve => {
    let state: CompositionState | null = null;
    const interval = setInterval(async () => {
      const composition = await page.evaluate(() => window.compositionState);

      if (state && state.duration === composition.duration) {
        clearInterval(interval);
        resolve(composition);
      }

      state = composition;
    }, 1000);
  });

  await browser.close();
  await renderComposition({ ...props, composition: state });
};
