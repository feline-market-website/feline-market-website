import { Module } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage, Product])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
