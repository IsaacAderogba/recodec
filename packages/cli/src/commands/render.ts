import { Command } from "commander";
import { RenderProps, render } from "@recodec/renderer";

interface RenderCommandProps {
  width: RenderProps["composition"]["metadata"]["width"];
  height: RenderProps["composition"]["metadata"]["height"];
  fps: RenderProps["composition"]["metadata"]["fps"];
  durationInFrames: RenderProps["composition"]["metadata"]["durationInFrames"];
  props: string;

  codec: RenderProps["configuration"]["codec"];
  outputFile: RenderProps["output"]["file"];
}

export const chainRenderCommand = (program: Command) => {
  program
    .command("render")
    .description("Render a recodec project")
    .argument("<string>", "entry file")
    .option("--width <number>")
    .option("--height <number>")
    .option("--fps <number>")
    .option("--duration-in-frames <number>")
    .option("--props <string>")
    .option("--codec <string>")
    .option("--output-file <string>")
    .action(async (entry: string, options: RenderCommandProps) => {
      await render({
        entry,
        output: { file: options.outputFile },
        composition: {
          props: JSON.parse(options.props),
          metadata: {
            durationInFrames: options.durationInFrames,
            fps: options.fps,
            height: options.height,
            width: options.width
          }
        },
        configuration: { codec: options.codec }
      });
    });
};
