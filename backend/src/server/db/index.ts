import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./migrations/schema";
import { env } from "~/env";

let connection: postgres.Sql;
if (env.NODE_ENV === "production") {
  connection = postgres(env.NEON_URL, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection?: postgres.Sql;
  };

  globalConnection.connection ??= postgres(env.NEON_URL, {
      prepare: false,
    });

  connection = globalConnection.connection;
}

const db = drizzle(connection, { schema });

export * from "./migrations/schema";
export { db };