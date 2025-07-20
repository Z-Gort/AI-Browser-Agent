import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv'

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/server/db/migrations/schema.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_URL!,
  },
});
