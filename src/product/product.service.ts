import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { products } from 'src/database/tables';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductService {
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.db.insert(products).values({
      name: createProductDto.name,
      price: createProductDto.price,
      images: createProductDto.image.map(image => ({ url: image, isThumbnail: false })),
      description: createProductDto.description,
    }).returning({
      id: products.id,
      name: products.name,
      price: products.price,
      images: products.images,
      description: products.description,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    });
  }

  async getProducts() {
    return this.db.select().from(products);
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    return this.db.update(products).set(updateProductDto).where(eq(products.id, updateProductDto.id));
  }
}