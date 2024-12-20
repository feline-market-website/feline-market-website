import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Vendor } from './entities/vendor.entity';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vendor])],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}
