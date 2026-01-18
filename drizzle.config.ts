import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/tables/index.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: '__drizzle_migrations', // `__drizzle_migrations` by default
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
});