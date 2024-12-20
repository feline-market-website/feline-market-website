import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { VendorsService } from './vendors.service';
import { Vendor } from './entities/vendor.entity';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateVendorDto,
  ): Promise<Vendor> {
    return this.vendorsService.createVendor(userId, dto);
  }

  @Get()
  async findAll(): Promise<Vendor[]> {
    return this.vendorsService.findAllVendors();
  }

  @Get(':vendorId')
  async findOne(@Param('vendorId') vendorId: string): Promise<Vendor> {
    return this.vendorsService.findOneVendorByVendorId(vendorId);
  }

  @Patch(':vendorId')
  async update(
    @Param('vendorId') vendorId: string,
    @Body() dto: UpdateVendorDto,
  ): Promise<Vendor> {
    return this.vendorsService.updateVendorByVendorId(vendorId, dto);
  }

  @Delete(':vendorId')
  async delete(@Param('vendorId') vendorId: string): Promise<Vendor> {
    return this.vendorsService.deleteVendorByVendorId(vendorId);
  }
}
