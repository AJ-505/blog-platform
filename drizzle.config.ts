import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

const databaseUrl = new URL(process.env.DATABASE_URL!);
databaseUrl.searchParams.set("sslmode", "require");

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl.toString(),
  },
} satisfies Config;
