import { pgTable, text, timestamp, pgEnum, uuid, varchar } from 'drizzle-orm/pg-core';

// Define Role enum to match Prisma schema
export const roleEnum = pgEnum('Role', ['ADMIN', 'CLIENT']);

// Define the "users" table schema (matches Prisma schema)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),                    // String ID (cuid)
  name: varchar('name', { length: 255 }).notNull(),                   // User's name
  email: varchar('email', { length: 255 }).notNull().unique(),        // Email must be unique
  password: varchar('password', { length: 255 }).notNull().unique(),         // Hashed password
  role: roleEnum('role').default('CLIENT'),       // Role enum with default
  createdAt: timestamp('created_at').defaultNow(), // Timestamp for user creation
  updatedAt: timestamp('updated_at').defaultNow(), // Timestamp for last update
});
