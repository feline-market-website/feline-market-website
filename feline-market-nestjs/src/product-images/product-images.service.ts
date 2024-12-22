import { CreateProductImageDto } from './dto/create-product-image.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { validate } from 'uuid';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProductImage(dto: CreateProductImageDto): Promise<ProductImage> {
    try {
      const product = await this.productRepository.findOneByOrFail({
        id: dto.product_id,
      });
      const productImage = this.productImageRepository.create({
        ...dto,
        product,
      });
      return this.productImageRepository.save(productImage);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating product' image: ${error.message}`,
      );
    }
  }

  async findAllProductImages(): Promise<ProductImage[]> {
    try {
      return this.productImageRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving all product' images: ${error.message}`,
      );
    }
  }

  findOneProductImageById(productImageId: string): Promise<ProductImage> {
    try {
      if (!validate(productImageId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      return this.productImageRepository.findOneOrFail({
        where: { id: productImageId },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the product' image: ${error.message}`,
      );
    }
  }

  async updateProductImage(
    productImageId: string,
    dto: UpdateProductImageDto,
  ): Promise<ProductImage> {
    try {
      const productImage = await this.findOneProductImageById(productImageId);
      Object.assign(productImage, dto);
      return this.productImageRepository.save(productImage);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating the product' image: ${error.message}`,
      );
    }
  }

  async removeProductImage(productImageId: string): Promise<ProductImage> {
    try {
      const productImage = await this.findOneProductImageById(productImageId);
      return this.productImageRepository.remove(productImage);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while removing the product' image: ${error.message}`,
      );
    }
  }
}
