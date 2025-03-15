"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_admin_controller_1 = require("./products.admin.controller");
const products_service_1 = require("./products.service");
const product_entity_1 = require("./entities/product.entity");
const product_repository_1 = require("./repositories/product.repository");
const productVariant_entity_1 = require("./entities/productVariant.entity");
const productPricing_entity_1 = require("./entities/productPricing.entity");
const productPricing_repository_1 = require("./repositories/productPricing.repository");
const products_controller_1 = require("./products.controller");
const category_entity_1 = require("../categories/entities/category.entity");
const productReview_entity_1 = require("./entities/productReview.entity");
const productReview_repository_1 = require("./repositories/productReview.repository");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.Product,
                productVariant_entity_1.ProductVariant,
                productPricing_entity_1.ProductPricing,
                category_entity_1.Category,
                productReview_entity_1.ProductReview,
            ]),
        ],
        controllers: [products_admin_controller_1.ProductsAdminController, products_controller_1.ProductsController],
        providers: [
            products_service_1.ProductsService,
            product_repository_1.ProductRepository,
            productPricing_repository_1.ProductPricingRepository,
            productReview_repository_1.ProductReviewRepository,
        ],
        exports: [product_repository_1.ProductRepository],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map