import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, Plugin } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss() as Plugin[], vue()],
});
