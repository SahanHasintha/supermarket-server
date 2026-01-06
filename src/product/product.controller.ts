import { Controller, Post, Body, ValidationPipe, HttpStatus, HttpCode, UseGuards, Get, Patch} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/create-product.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    console.log("createProductDto", createProductDto);
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    return this.productService.getProducts();
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateProduct(@Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
  }
}