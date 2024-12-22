import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateVendorDto,
  ): Promise<{message: string, data: Vendor}> {
    const createdVendor = await this.vendorsService.createVendor(dto);
    return {message: `Vendor has created successfully`, data: createdVendor}
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{message: string, data: Vendor[]}> {
    const vendors = await this.vendorsService.findAllVendors();
    return {message: `Vendors have retrieved successfully`, data: vendors}
  }

  @Get(':vendorId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('vendorId') vendorId: string): Promise<{message: string, data: Vendor}> {
    const vendor = await this.vendorsService.findOneVendorByVendorId(vendorId);
    return {message:`Vendor has retrieved successfully`, data: vendor}
  }

  @Patch(':vendorId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('vendorId') vendorId: string,
    @Body() dto: UpdateVendorDto,
  ): Promise<{message: string, data: Vendor}> {
    const updatedVendor = await this.vendorsService.updateVendorByVendorId(vendorId, dto);
    return {message: `Vendor has updated successfully`, data: updatedVendor}
  }

  @Delete(':vendorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('vendorId') vendorId: string): Promise<{message: string}> {
    await this.vendorsService.deleteVendorByVendorId(vendorId);
    return {message: `Vendor has deleted successfully`}
  }
}
