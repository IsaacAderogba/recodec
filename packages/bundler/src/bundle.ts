import { build } from "esbuild";

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
    outdir: output.dir,
    outfile: "recodec.js"
  });
};
