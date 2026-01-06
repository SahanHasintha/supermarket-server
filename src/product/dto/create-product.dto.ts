import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsArray()
  image: string[];
  
  @IsOptional()
  @IsString()
  description?: string;


}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsArray()
  image: string[];
  
  @IsOptional()
  @IsString()
  description?: string;
}