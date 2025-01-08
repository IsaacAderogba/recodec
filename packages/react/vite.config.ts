import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: "./tsconfig.app.json", include: ["src"] })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      name: "Recodec",
      entry: resolve(__dirname, "src", "index.tsx"),
      formats: ["es"],
      fileName: "index"
    }
  },
  server: {
    port: 5172
  }
});
