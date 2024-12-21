import { CreateVendorDto } from './dto/create-vendor.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { validate } from 'uuid';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createVendor(userId: string, dto: CreateVendorDto): Promise<Vendor> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException('Invalid UUID format');
      }
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      const vendor = this.vendorRepository.create({
        ...dto,
        user,
      });
      return this.vendorRepository.save(vendor);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating a vendor: ${error.message}`,
      );
    }
  }

  async findOneVendorByVendorId(vendorId: string): Promise<Vendor> {
    if (!validate(vendorId)) {
      throw new BadRequestException('Invalid UUID format');
    }
    try {
      return await this.vendorRepository.findOneOrFail({
        where: { id: vendorId },
        relations: ['user'],
      });
    } catch {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
  }

  async findAllVendors(): Promise<Vendor[]> {
    try {
      return this.vendorRepository.find({
        relations: ['user'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieved all vendors: ${error.message}`,
      );
    }
  }

  async updateVendorByVendorId(
    vendorId: string,
    dto: UpdateVendorDto,
  ): Promise<Vendor> {
    try {
      if (!validate(vendorId)) {
        throw new BadRequestException('Invalid UUID format');
      }
      const vendor = await this.findOneVendorByVendorId(vendorId);
      Object.assign(vendor, dto);
      return this.vendorRepository.save(vendor);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while update vendor by id: ${error.message}`,
      );
    }
  }

  async deleteVendorByVendorId(vendorId: string): Promise<Vendor> {
    try {
      if (!validate(vendorId)) {
        throw new BadRequestException('Invalid UUID format');
      }
      const vendor = await this.vendorRepository.findOneByOrFail({
        id: vendorId,
      });
      return this.vendorRepository.remove(vendor);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred whie deleting vendor by id: ${error.message}`,
      );
    }
  }
}
