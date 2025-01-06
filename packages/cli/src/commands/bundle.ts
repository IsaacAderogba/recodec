import { Command } from "commander";
import { bundle, BundleProps } from "@recodec/bundler";

interface BundleCommandProps {
  outputDir: BundleProps["output"]["dir"];
}

export const chainBundleCommand = (program: Command) => {
  program
    .command("bundle")
    .description("Bundle a recodec project to be rendered later")
    .argument("<string>", "entry file")
    .option("--output-dir <string>", "output directory")
    .action(async (entry: string, options: BundleCommandProps) => {
      await bundle({ entry, output: { dir: options.outputDir } });
    });
};
