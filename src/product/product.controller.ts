import { Controller, Post, Body, ValidationPipe, HttpStatus, HttpCode, UseGuards} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";

@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    console.log("createProductDto", createProductDto);
    return this.productService.createProduct(createProductDto);
  }
}