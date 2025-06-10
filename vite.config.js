import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index1.html"),
        sub1: resolve(__dirname, "index1-2.html"),
        sub2: resolve(__dirname, "index2.html"),
        sub3: resolve(__dirname, "index2-2.html"),
      },
    },
  },
});
