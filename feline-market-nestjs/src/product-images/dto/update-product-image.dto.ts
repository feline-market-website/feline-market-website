import { CreateProductImageDto } from './create-product-image.dto';
import { IsUrl } from 'class-validator';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {
    @IsUrl()
    @Optional()
    image_url: string;
}
