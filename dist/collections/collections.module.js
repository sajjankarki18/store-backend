"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsModule = void 0;
const common_1 = require("@nestjs/common");
const collection_admin_controller_1 = require("./collection.admin.controller");
const collection_service_1 = require("./collection.service");
const typeorm_1 = require("@nestjs/typeorm");
const CollectionRedirect_entity_1 = require("./entities/CollectionRedirect.entity");
const collection_entity_1 = require("./entities/collection.entity");
const collection_repository_1 = require("./repositories/collection.repository");
const category_entity_1 = require("../categories/entities/category.entity");
const categories_module_1 = require("../categories/categories.module");
const products_module_1 = require("../products/products.module");
const product_entity_1 = require("../products/entities/product.entity");
const collection_controller_1 = require("./collection.controller");
let CollectionsModule = class CollectionsModule {
};
exports.CollectionsModule = CollectionsModule;
exports.CollectionsModule = CollectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                collection_entity_1.Collection,
                CollectionRedirect_entity_1.CollectionRedirect,
                category_entity_1.Category,
                product_entity_1.Product,
            ]),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
        ],
        controllers: [collection_admin_controller_1.CollectionsAdminController, collection_controller_1.CollectionsController],
        providers: [collection_service_1.CollectionService, collection_repository_1.CollectionRepository],
        exports: [collection_repository_1.CollectionRepository],
    })
], CollectionsModule);
//# sourceMappingURL=collections.module.js.map