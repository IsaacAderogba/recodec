import { build } from "esbuild";
import path from "path";

export interface BundleProps {
  entry: string;
  output: {
    dir: string;
  };
}

export const bundle = async (props: BundleProps) => {
  const { entry, output } = props;

  await build({
    entryPoints: [entry],
    bundle: true,
    outfile: path.join(output.dir, "renderer.js")
  });
};
