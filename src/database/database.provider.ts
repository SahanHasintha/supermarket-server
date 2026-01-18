import { Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './tables';
import { ConfigService } from '@nestjs/config';

console.log('DB Config:', {
    host: process.env.DATABASE_URL
  });

const pool = new Pool({
  connectionString: 'postgresql://postgres:password@localhost:5432/mydb',
});

export const databaseProvider: Provider = {
  provide: 'DRIZZLE',
  useValue: drizzle(pool, { schema }),
};
