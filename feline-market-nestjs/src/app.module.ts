import { Module, OnModuleInit } from '@nestjs/common';
import dataSource, { dataSourceOptions } from 'db/data-source';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource:DataSource) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize(); // Checking Database connection status.
        console.log('Database connection established successfully.');
      } else {
        console.log('Database connection is already initialized.');
      }
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}
