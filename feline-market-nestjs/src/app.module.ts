import { Module, OnModuleInit } from '@nestjs/common';

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
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: Boolean(process.env.DB_IS_SYNC),
    }),
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
