import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';

import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }


    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto);
    }


    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }


    @Get('search')
    searchProducts(@Query('keyword') keyword: string) {
        return this.productsService.searchProducts(keyword);
    }


    @Get('category/:cat')
    getProductsByCategory(@Param('cat') category: string) {
        return this.productsService.getProductsByCategory(category);
    }


    @Patch(':id/toggle')
    toggleProductStatus(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productsService.toggleProductStatus(id);
    }


    @Get(':id')
    getProductById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productsService.getProductById(id);
    }


    @Put(':id')
    replaceProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProductDto,
    ) {
        return this.productsService.replaceProduct(id, dto);
    }


    @Patch(':id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: PartialUpdateProductDto,
    ) {
        return this.productsService.updateProduct(id, dto);
    }


    @Delete(':id')
    deleteProductById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productsService.deleteProductById(id);
    }
}