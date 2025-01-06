import react from "@vitejs/plugin-react";
import path from "path";
import { build, defineConfig } from "vite";

export interface BundleProps {
  entry: string;
  output: {
    dir: string;
  };
}

export const bundle = async (props: BundleProps) => {
  const { entry, output } = props;

  await build(
    defineConfig({
      plugins: [react()],
      build: {
        copyPublicDir: false,
        lib: {
          entry,
          formats: ["cjs"],
          fileName: "bundle"
        },
        outDir: output.dir
      }
    })
  );
};
