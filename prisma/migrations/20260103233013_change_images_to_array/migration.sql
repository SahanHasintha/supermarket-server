

ALTER TABLE "products"
ALTER COLUMN "image"
TYPE TEXT[]
USING ARRAY["image"];

