// db/schema/products.ts
import { pgTable, timestamp, numeric, uuid, varchar, jsonb } from "drizzle-orm/pg-core";

export type ImageObject = {
    url: string;
    isThumbnail: boolean;
  };

export const products = pgTable("products", {
  id: uuid('id').primaryKey().defaultRandom(),              // Prisma cuid()
  name: varchar('name', { length: 255 }).notNull(),
  price: numeric("price", { mode: "number" }).notNull(),
  images: jsonb('images')
    .$type<ImageObject[]>() // 👈 Type-safe JSON
    .notNull(),
  description: varchar('description', { length: 255 }),         // Optional
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()).notNull(),
});
