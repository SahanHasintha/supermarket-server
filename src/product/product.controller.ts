import { Controller, Post, Body, ValidationPipe, HttpStatus, HttpCode} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    console.log("createProductDto", createProductDto);
    return this.productService.createProduct(createProductDto);
  }
}