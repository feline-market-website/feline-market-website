import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
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
    const vendor = await this.vendorRepository.findOneBy({
      id: dto.vendor_id,
    });
    if (!vendor) {
      throw new NotFoundException('Vendor Not found');
    }
    try {
      const product = this.productRepository.create({
        ...dto,
        vendor,
      });
      return this.productRepository.save(product);
    } catch (error) {
      console.error('Product service error: ', error.message);
      throw new InternalServerErrorException(
        `An internal server error occurred while creating product`,
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

  async findProductsByUserId(userId: string): Promise<Product[]> {
    if (!validate(userId)) {
      throw new BadRequestException('User id not found');
    }
    return this.productRepository.find({
      where: { vendor: { user: { id: userId } } },
    });
  }

  async findUserProductsPagination(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Product[];
    total: number;
    currentPage: number;
    totalPage: number;
  }> {
    if (!validate(userId)) {
      throw new BadRequestException('valid uuid format');
    }
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await this.productRepository.findAndCount({
        where: { vendor: { user: { id: userId } } },
        skip,
        take: limit,
        order: {
          created_at: 'DESC',
        },
      });
      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      console.log("error find user's products pagination");
      throw new InternalServerErrorException("error find user's products pagination");
    }
  }

  async findUserProductsByName(
    userId: string,
    name: string,
  ): Promise<Product[]> {
    if (!validate(userId)) {
      throw new BadRequestException('User id not found');
    }
    return this.productRepository.find({
      where: {
        vendor: { user: { id: userId } },
        name: ILike(`%${name}%`),
      },
    });
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
