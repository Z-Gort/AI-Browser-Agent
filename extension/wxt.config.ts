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
      "https://epic-man-32.clerk.accounts.dev/*",
      "https://*.vercel.app/*", // Allow any Vercel app
    ],
    key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA06sUk6pbAgRqN41xp68R6HmSBDEe1cHyQfhyEs/wBLCluP6xdpjqbADz5QMz1VAk7zZXnlyD+lFG8qvvxPrhspBBNwlZeDoqnof5YxoZLQ9rTbrAdm7mY7X79f65BxwDr+qwEZk2nIaIuRpremf1wTSs43hLsrLeT0XGCzVU8Ssru5hNuGd0EYuACHsNXKpD/d7lzWW/g22TvVdAq56nR02/XY/GgXqXdDvvMMYtoevVjS8gVyvQ2j/a3Bh/LjDbI2ckL7SQNdj2WuNteNUR6F/GRTbrPL0QSP46+zlZLJ7XXPCue/GmtrnkAaWHJO3OVB27Jw4z5+zdIMGcP9PHowIDAQAB",
  },
});
