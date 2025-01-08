import { Command } from "commander";
import { RenderProps, render } from "@recodec/renderer";

interface RenderCommandProps {
  width: RenderProps["composition"]["metadata"]["width"];
  height: RenderProps["composition"]["metadata"]["height"];
  fps: RenderProps["composition"]["metadata"]["fps"];
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
    .option("--props <string>")
    .option("--codec <string>")
    .option("--output-file <string>")
    .action(async (entry: string, options: RenderCommandProps) => {
      await render({
        entry,
        output: { file: options.outputFile },
        composition: JSON.parse(options.props),
        metadata: {
          fps: parseInt(options.fps),
          height: parseInt(options.height),
          width: parseInt(options.width)
        },
        configuration: { codec: options.codec }
      });
    });
};
