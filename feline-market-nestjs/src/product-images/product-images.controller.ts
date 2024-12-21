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
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage } from './entities/product-image.entity';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post(':productId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('productId') productId: string,
    @Body() dto: CreateProductImageDto,
  ): Promise<{ message: string; data: ProductImage }> {
    const createdProductImage =
      await this.productImagesService.createProductImage(productId, dto);
    return {
      message: 'Product image has created successfully',
      data: createdProductImage,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: ProductImage[] }> {
    const productImages =
      await this.productImagesService.findAllProductImages();
    return {
      message: 'Product images have retrieved successfully',
      data: productImages,
    };
  }

  @Get(':productImageId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('productImageId') productImageId: string,
  ): Promise<{ message: string; data: ProductImage }> {
    const productImage =
      await this.productImagesService.findOneProductImageById(productImageId);
    return {
      message: 'Product image has retrieved successfully',
      data: productImage,
    };
  }

  @Patch(':productImageId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('productImageId') productImageId: string,
    @Body() dto: UpdateProductImageDto,
  ): Promise<{ message: string; data: ProductImage }> {
    const productImage = await this.productImagesService.updateProductImage(
      productImageId,
      dto,
    );
    return {
      message: 'Product image has updated successfully',
      data: productImage,
    };
  }

  @Delete(':productImageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('productImageId') productImageId: string,
  ): Promise<{ message: string }> {
    await this.productImagesService.removeProductImage(productImageId);
    return { message: 'Product image has removed successfully' };
  }
}
