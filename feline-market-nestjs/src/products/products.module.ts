import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from 'src/vendors/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Product, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
