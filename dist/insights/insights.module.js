"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsModule = void 0;
const common_1 = require("@nestjs/common");
const insights_service_1 = require("./insights.service");
const insights_admin_controller_1 = require("./insights.admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("../carts/entities/cart.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const product_entity_1 = require("../products/entities/product.entity");
const carts_module_1 = require("../carts/carts.module");
const products_module_1 = require("../products/products.module");
const customers_module_1 = require("../customers/customers.module");
let InsightsModule = class InsightsModule {
};
exports.InsightsModule = InsightsModule;
exports.InsightsModule = InsightsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, customer_entity_1.Customer, product_entity_1.Product]),
            (0, common_1.forwardRef)(() => carts_module_1.CartsModule),
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
            (0, common_1.forwardRef)(() => customers_module_1.CustomersModule),
        ],
        providers: [insights_service_1.InsightsService],
        controllers: [insights_admin_controller_1.InsightsController],
    })
], InsightsModule);
//# sourceMappingURL=insights.module.js.map