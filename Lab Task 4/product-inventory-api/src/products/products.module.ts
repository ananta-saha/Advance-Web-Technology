import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from './entities/products.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([products])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
