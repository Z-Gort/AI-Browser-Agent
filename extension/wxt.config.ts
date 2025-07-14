import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
  manifest: {
    name: "Browser Cursor",
    description: "Cursor-like AI for your browser",
    action: {}, // This enables the sidepanel to open on action click
    permissions: ["cookies", "storage"],
    host_permissions: [
      "http://localhost:3001/*",
      "http://localhost/*",
      "https://epic-man-32.clerk.accounts.dev",
    ],
  },
});
