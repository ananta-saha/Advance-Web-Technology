import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(products)
        private readonly productRepo: Repository<products>,
    ) { }

    async createProduct(dto: CreateProductDto): Promise<products> {
        try {
            const product = this.productRepo.create(dto);

            return await this.productRepo.save(product);
        } catch {
            throw new BadRequestException('Product failed to create');
        }
    }

    async getAllProducts(): Promise<products[]> {
        return await this.productRepo.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }


    async getProductById(id: number): Promise<products> {
        const product = await this.productRepo.findOne({
            where: {
                id: id,
            },
        });

        if (product) {
            return product;
        } else {
            throw new NotFoundException(
                `Product with id ${id} not found`,
            );
        }
    }


    async deleteProductById(id: number): Promise<string> {
        const res = (await this.productRepo.delete(id)).affected;

        if (res != null && res > 0) {
            return `Product with id ${id} deleted successfully`;
        } else {
            throw new NotFoundException(
                `Product with id ${id} not found`,
            );
        }
    }


    async replaceProduct(
        id: number,
        product: UpdateProductDto,
    ): Promise<products> {
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: id,
            },
        });

        if (!existingProduct) {
            throw new NotFoundException(
                `Product with id ${id} not found`,
            );
        }

        existingProduct.name = product.name;
        existingProduct.description = product.description ?? '';
        existingProduct.price = product.price;
        existingProduct.stock = product.stock ?? 0;
        existingProduct.category = product.category;
        existingProduct.isActive = product.isActive ?? true;

        try {
            return await this.productRepo.save(existingProduct);
        } catch {
            throw new BadRequestException(
                `Product with id ${id} failed to be replaced`,
            );
        }
    }


    async updateProduct(
        id: number,
        product: PartialUpdateProductDto,
    ): Promise<products> {
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: id,
            },
        });

        if (!existingProduct) {
            throw new NotFoundException(
                `Product with id ${id} not found`,
            );
        }

        this.productRepo.merge(existingProduct, product);

        try {
            return await this.productRepo.save(existingProduct);
        } catch {
            throw new BadRequestException(
                `Product with id ${id} failed to be updated`,
            );
        }
    }


    async getProductsByCategory(
        category: string,
    ): Promise<products[]> {
        return await this.productRepo.find({
            where: {
                category: category,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }


    async searchProducts(keyword: string): Promise<products[]> {
        return await this.productRepo.find({
            where: {
                name: ILike(`%${keyword}%`),
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }


    async toggleProductStatus(id: number): Promise<products> {
        const product = await this.productRepo.findOne({
            where: {
                id: id,
            },
        });

        if (!product) {
            throw new NotFoundException(
                `Product with id ${id} not found`,
            );
        }

        product.isActive = !product.isActive;

        try {
            return await this.productRepo.save(product);
        } catch {
            throw new BadRequestException(
                `Product with id ${id} status failed to update`,
            );
        }
    }
}