"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const product_repository_1 = require("./repositories/product.repository");
const status_enum_1 = require("../enums/status.enum");
const typeorm_2 = require("typeorm");
const productVariant_entity_1 = require("./entities/productVariant.entity");
const productVariant_repository_1 = require("./repositories/productVariant.repository");
const productPricing_repository_1 = require("./repositories/productPricing.repository");
let ProductsService = class ProductsService {
    constructor(productsRepository, productsVariantRepository, productPricingRepository) {
        this.productsRepository = productsRepository;
        this.productsVariantRepository = productsVariantRepository;
        this.productPricingRepository = productPricingRepository;
        this.validateProduct = async (productId) => {
            const product = await this.productsRepository.findOne({
                where: {
                    id: productId,
                },
            });
            if (!product) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    error: `product id ${productId} not found`,
                });
            }
        };
    }
    async createProduct(productDto) {
        try {
            const product = this.productsRepository.create({
                title: productDto.title,
                description: productDto.description,
                category_id: productDto.category_id,
                status: productDto.status || status_enum_1.StatusEnum.Draft,
            });
            return await this.productsRepository.save(product);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating the product', error],
                error: 'Internal server error',
            });
        }
    }
    async findProductById(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['product not found!'],
                error: 'Not Found',
            });
        }
        return product;
    }
    async fetchAllProducts({ page, limit, status, query, }) {
        if (isNaN(Number(page)) || isNaN(Number(limit)) || page < 0 || limit < 0) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['page and limits must be of positive integers'],
                error: 'Bad request',
            });
        }
        const new_limit = limit > 10 ? parseInt(process.env.PAGE_LIMIT) : limit;
        const [data, total] = await this.productsRepository.findAndCount({
            where: {
                status: status.toLowerCase() === 'published'
                    ? status_enum_1.StatusEnum.Published
                    : status_enum_1.StatusEnum.Draft,
                title: (0, typeorm_2.ILike)(`%${query.trim()}%`),
            },
            skip: (page - 1) * new_limit,
            take: new_limit,
            order: { created_at: 'desc' },
        });
        return {
            data,
            page,
            limit: new_limit,
            total,
        };
    }
    async searchProduct(query) {
        let searchedProducts;
        if (query) {
            searchedProducts = await this.productsRepository.find({
                where: {
                    title: (0, typeorm_2.ILike)(`%${query.trim()}%`),
                },
            });
        }
        else {
            searchedProducts = await this.productsRepository.find();
        }
        const products_length = searchedProducts.length;
        if (products_length == 0) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['no results for searched products'],
                error: 'Not Found',
            });
        }
        return {
            data: searchedProducts,
            total: products_length,
        };
    }
    async updateProduct(id, productDto) {
        const product = await this.productsRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['product not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.productsRepository.update({ id }, {
                title: productDto.title,
                description: productDto.description,
                category_id: productDto.category_id,
                status: productDto.status,
            });
            return await this.productsRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating the product', error],
                error: 'Internal server error',
            });
        }
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['product not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.productsRepository.softDelete(id);
            return {
                id: `${id}`,
                message: 'product has been deleted',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating the product', error],
                error: 'Internal server error',
            });
        }
    }
    async createProductVariant(productVariantDto) {
        await this.validateProduct(productVariantDto.product_id);
        try {
            const productVariant = this.productsVariantRepository.create({
                product_id: productVariantDto.product_id,
                color: productVariantDto.color,
                size: productVariantDto.size,
            });
            return await this.productsVariantRepository.save(productVariant);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: [
                    'some error occured while creating a variant for the product',
                    error,
                ],
                error: 'Internal server error',
            });
        }
    }
    async getProductVariantById(variantId) {
        const productVariant = await this.productsVariantRepository.findOne({
            where: { id: variantId },
        });
        if (!productVariant) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product variant not found`],
                error: 'Not Found',
            });
        }
        return await this.productsVariantRepository.findOne({
            where: { id: variantId },
        });
    }
    async updateProductVariant(id, productVariantDto) {
        const productVariant = await this.productsVariantRepository.findOne({
            where: {
                id,
            },
        });
        if (!productVariant) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product variant not found`],
                error: 'Not Found',
            });
        }
        try {
            await this.productsVariantRepository.update({ id }, {
                product_id: productVariantDto.product_id,
                color: productVariantDto.color,
                size: productVariantDto.size,
            });
            return await this.productsVariantRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: [
                    'some error occured while creating a updating the variant for the product',
                    error,
                ],
                error: 'Internal server error',
            });
        }
    }
    async deleteProductVariant(id) {
        const productVariant = await this.productsVariantRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!productVariant) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product variant not found`],
                error: 'Not Found',
            });
        }
        await this.productsVariantRepository.delete(id);
        return {
            id: `${id}`,
            message: 'product variant has been deleted',
        };
    }
    async createProductPricing(productPricingDto) {
        await this.validateProduct(productPricingDto.product_id);
        try {
            const productPrice = this.productPricingRepository.create({
                product_id: productPricingDto.product_id,
                country_code: productPricingDto.country_code,
                currency: productPricingDto.currency,
                price: productPricingDto.price,
                crossed_price: productPricingDto.crossed_price,
                selling_price: productPricingDto.selling_price,
            });
            console.log(productPrice);
            return await this.productPricingRepository.save(productPrice);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: [
                    'some error occured while creating pricing for the product',
                    error,
                ],
                error: 'Internal Server',
            });
        }
    }
    async getProductPricingById(id) {
        const productPricing = await this.productPricingRepository.findOne({
            where: { id: id },
        });
        if (!productPricing) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product pricing not found`],
                error: 'Not Found',
            });
        }
        return await this.productPricingRepository.findOne({
            where: { id: id },
        });
    }
    async updateProductPricing(id, productPricingDto) {
        const productPricing = await this.productPricingRepository.findOne({
            where: {
                id,
            },
        });
        if (!productPricing) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product pricing not found`],
                error: 'Not Found',
            });
        }
        try {
            await this.productPricingRepository.update({ id }, {
                product_id: productPricingDto.product_id,
                country_code: productPricingDto.country_code,
                currency: productPricingDto.currency,
                price: productPricingDto.price,
                selling_price: productPricingDto.selling_price,
                crossed_price: productPricingDto.selling_price,
            });
            return await this.productPricingRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: [
                    'some error occured while creating a updating the pricing for the product',
                    error,
                ],
                error: 'Internal server error',
            });
        }
    }
    async deleteProductPricing(id) {
        const productPricing = await this.productPricingRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!productPricing) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`product pricing not found`],
                error: 'Not Found',
            });
        }
        await this.productPricingRepository.delete(id);
        return {
            id: `${id}`,
            message: 'product pricing has been deleted',
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productVariant_entity_1.ProductVariant)),
    __param(2, (0, typeorm_1.InjectRepository)(productPricing_repository_1.ProductPricingRepository)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        productVariant_repository_1.ProductVariantRepository,
        productPricing_repository_1.ProductPricingRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map