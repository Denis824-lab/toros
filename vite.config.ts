import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import cascadeLayers from "@csstools/postcss-cascade-layers";
import { fileURLToPath } from "node:url";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/toros/",
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      // Edge 92 skips layered rules. Preserve their cascade when flattening CSS.
      plugins: [cascadeLayers()],
    },
  },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    target: ["chrome92", "edge92", "firefox104", "safari16"],
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion"],
          swiper: ["swiper"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
