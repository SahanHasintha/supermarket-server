import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: updateProductDto.id },
      data: updateProductDto,
    });
  }
}