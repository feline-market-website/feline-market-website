import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const createdProduct = await this.productsService.createProduct(dto);
    return {
      message: 'Product has created successfully',
      data: createdProduct,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: Product[] }> {
    const products = await this.productsService.findAllProduct();
    return { message: 'Products have retrieved successfully', data: products };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('productId') productId: string,
  ): Promise<{ message: string; data: Product }> {
    const product = await this.productsService.findOneProduct(productId);
    return { message: 'Product has retrieved successfully', data: product };
  }

  @Patch(':productId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const updatedProduct = await this.productsService.updateProduct(
      productId,
      dto,
    );
    return {
      message: 'Product has updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('productId') productId: string,
  ): Promise<{ message: string }> {
    await this.productsService.removeProduct(productId);
    return { message: 'Product has removed successfully' };
  }
}
