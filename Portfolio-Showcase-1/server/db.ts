import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use a default database URL if not set
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfolio_dev';

try {
  export const pool = new Pool({ connectionString: databaseUrl });
  export const db = drizzle(pool, { schema });
} catch (error) {
  console.warn('Database connection failed, using in-memory fallback:', error);
  // Export placeholders to avoid import errors
  export const db = null;
  export const pool = null;
}
