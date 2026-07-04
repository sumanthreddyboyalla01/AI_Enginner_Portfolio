import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    nitro({
      preset: process.env.VERCEL ? "vercel" : undefined,
    }),
    react(),
    tailwindcss(),
    visualizer({ open: false, gzipSize: true, brotliSize: true }),
  ],
});
