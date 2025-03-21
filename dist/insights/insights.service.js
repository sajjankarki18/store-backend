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
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("../carts/entities/cart.entity");
const cart_repository_1 = require("../carts/repositories/cart.repository");
const product_entity_1 = require("../products/entities/product.entity");
const product_repository_1 = require("../products/repositories/product.repository");
const customer_entity_1 = require("../customers/entities/customer.entity");
const customer_repository_1 = require("../customers/repositories/customer.repository");
const status_enum_1 = require("../enums/status.enum");
let InsightsService = class InsightsService {
    constructor(cartRepository, productRepository, customerRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }
    async getInSightsData() {
        const totalAddedCarts = await this.cartRepository.count();
        const totalProducts = await this.productRepository.count({
            where: { status: status_enum_1.StatusEnum.Published },
        });
        const totalCustomers = await this.customerRepository.count();
        return {
            data: [{ totalAddedCarts, totalProducts, totalCustomers }],
        };
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository,
        product_repository_1.ProductRepository,
        customer_repository_1.CustomerRepository])
], InsightsService);
//# sourceMappingURL=insights.service.js.map