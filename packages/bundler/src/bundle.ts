import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
          formats: ["es"],
          fileName: "bundle"
        },
        outDir: output.dir
      }
    })
  );
};
