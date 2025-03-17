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
exports.ProductsAdminController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const create_productVariant_dto_1 = require("./dto/create-productVariant.dto");
const update_productVariant_dto_1 = require("./dto/update-productVariant.dto");
const create_productPricing_dto_1 = require("./dto/create-productPricing.dto");
const update_productPricing_dto_1 = require("./dto/update-productPricing.dto");
const status_enum_1 = require("../enums/status.enum");
const swagger_1 = require("@nestjs/swagger");
let ProductsAdminController = class ProductsAdminController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    createProduct(productDto) {
        return this.productsService.createProduct(productDto);
    }
    searchProduct(query) {
        return this.productsService.searchProduct(query);
    }
    fetchAllProducts(page = 1, limit = 10, status) {
        if (!page || !limit) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['page and limit fields are empty!'],
                error: 'Bad Request',
            });
        }
        return this.productsService.fetchAllProducts({
            page,
            limit,
            status,
        });
    }
    findProductById(id) {
        return this.productsService.findProductById(id);
    }
    updateProduct(id, productDto) {
        return this.productsService.updateProduct(id, productDto);
    }
    deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
    createProductVariant(productVariantDto) {
        return this.productsService.createProductVariant(productVariantDto);
    }
    getProductVariantById(id) {
        return this.productsService.getProductVariantById(id);
    }
    updateProductVariant(id, productVariantDto) {
        return this.productsService.updateProductVariant(id, productVariantDto);
    }
    deleteProductVariant(id) {
        return this.productsService.deleteProductVariant(id);
    }
    createProductPricing(productPricingDto) {
        return this.productsService.createProductPricing(productPricingDto);
    }
    getProductPricingById(id) {
        return this.productsService.getProductPricingById(id);
    }
    updateProductPricing(id, productPricingDto) {
        return this.productsService.updateProductPricing(id, productPricingDto);
    }
    deleteProductPricing(id) {
        return this.productsService.deleteProductPricing(id);
    }
};
exports.ProductsAdminController = ProductsAdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Products' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Products created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.Post)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search a Products' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'fetched searched products' }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "searchProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all Products' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Products fetched sucessfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "fetchAllProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find a product by id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fetched a product' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "findProductById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a Products' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Products updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Products not found' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Products' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Products deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Products not found' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Post)('/product-variant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_productVariant_dto_1.CreateProductVariantDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "createProductVariant", null);
__decorate([
    (0, common_1.Get)('/product-variant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "getProductVariantById", null);
__decorate([
    (0, common_1.Put)('/product-variant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_productVariant_dto_1.UpdateProductVariantDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "updateProductVariant", null);
__decorate([
    (0, common_1.Delete)('/product-variant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "deleteProductVariant", null);
__decorate([
    (0, common_1.Post)('/product-pricing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_productPricing_dto_1.CreateProductPricingDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "createProductPricing", null);
__decorate([
    (0, common_1.Get)('/product-pricing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "getProductPricingById", null);
__decorate([
    (0, common_1.Put)('/product-pricing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_productPricing_dto_1.UpdateProductPricingDto]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "updateProductPricing", null);
__decorate([
    (0, common_1.Delete)('/product-pricing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsAdminController.prototype, "deleteProductPricing", null);
exports.ProductsAdminController = ProductsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Products'),
    (0, common_1.Controller)('/admin/products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsAdminController);
//# sourceMappingURL=products.admin.controller.js.map