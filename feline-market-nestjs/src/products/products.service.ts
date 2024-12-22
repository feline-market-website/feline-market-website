import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { validate } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const vendor = await this.vendorRepository.findOneByOrFail({
        id: dto.vendor_id,
      });
      const product = this.productRepository.create({
        ...dto,
        vendor,
      });
      return this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating product: ${error.message}`,
      );
    }
  }

  async findAllProduct(): Promise<Product[]> {
    try {
      return this.productRepository.find({ relations: ['vendor', 'images'] });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving all product: ${error.message}`,
      );
    }
  }

  async findOneProduct(productId: string): Promise<Product> {
    try {
      if (!validate(productId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      return this.productRepository.findOneOrFail({
        where: { id: productId },
        relations: ['vendor', 'images'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the product: ${error.message}`,
      );
    }
  }

  async updateProduct(
    productId: string,
    dto: UpdateProductDto,
  ): Promise<Product> {
    try {
      if (!validate(productId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      const product = await this.productRepository.findOneByOrFail({
        id: productId,
      });
      Object.assign(product, dto);
      return this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating the product: ${error.message}`,
      );
    }
  }

  async removeProduct(productId: string): Promise<Product> {
    try {
      const product = await this.findOneProduct(productId);
      return this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while deleting the product: ${error.message}`,
      );
    }
  }
}
