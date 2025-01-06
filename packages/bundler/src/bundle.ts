import react from "@vitejs/plugin-react";
import { build, defineConfig } from "vite";
import fs from "fs/promises";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export interface BundleProps {
  entry: string;
  output: {
    dir: string;
  };
}

export const bundle = async (props: BundleProps) => {
  const { entry, output } = props;

  const entryPath = path.resolve(process.cwd(), entry);
  const workingDir = path.resolve(process.cwd(), ".recodec");

  try {
    await fs.rm(workingDir, { recursive: true, force: true });
    await fs.mkdir(workingDir);

    await fs.writeFile(
      path.join(workingDir, "index.html"),
      `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
    `
    );

    await fs.writeFile(
      path.join(workingDir, "index.tsx"),
      `
import Component from "${entryPath}"
import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
    <Component />
);
    `
    );

    await build(
      defineConfig({
        plugins: [react(), viteSingleFile()],
        root: workingDir,
        build: {
          emptyOutDir: true,
          copyPublicDir: false,
          outDir: path.resolve(process.cwd(), output.dir)
        }
      })
    );
  } finally {
    await fs.rm(workingDir, { recursive: true, force: true });
  }
};
