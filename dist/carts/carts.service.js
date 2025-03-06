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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const cart_repository_1 = require("./repositories/cart.repository");
const cartItem_entity_1 = require("./entities/cartItem.entity");
const cartItem_repository_1 = require("./repositories/cartItem.repository");
const product_entity_1 = require("../products/entities/product.entity");
const product_repository_1 = require("../products/repositories/product.repository");
const productVariant_entity_1 = require("../products/entities/productVariant.entity");
const productVariant_repository_1 = require("../products/repositories/productVariant.repository");
let CartService = class CartService {
    constructor(cartRepository, cartItemRepository, productRepository, productVariantRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
    }
    async cartActions(cartItemDto) {
        let cartQuantity = 0;
        const cartItems = await this.cartItemRepository.find();
        const productVariant = await this.cartItemRepository.findOne({
            where: {
                variant_id: cartItemDto.variant_id,
            },
        });
        cartItems.forEach((cartItem) => {
            if (cartItem.quantity <= 0) {
                this.cartItemRepository.delete(cartItem.id);
            }
        });
        if (cartItemDto.quantity >= 0 && cartItemDto.quantity <= 20) {
            const variant = await this.productVariantRepository.findOne({
                where: {
                    id: cartItemDto.variant_id,
                },
            });
            const product = await this.productRepository.findOne({
                where: {
                    id: variant.product_id,
                },
            });
            if (productVariant) {
                cartQuantity = cartItemDto.quantity;
                return await this.cartItemRepository.update(productVariant.id, {
                    quantity: cartQuantity,
                });
            }
            else {
                const cartItem = this.cartItemRepository.create({
                    product_title: product.title,
                    product_id: product.id,
                    variant_id: cartItemDto.variant_id,
                    quantity: cartItemDto.quantity,
                    price: cartItemDto.price,
                    cart_id: cartItemDto.cart_id,
                });
                return await this.cartItemRepository.save(cartItem);
            }
        }
        else {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: [
                    'quantity limit exeeded, selected quantity must be less than equal to 20',
                ],
                error: 'Conflict',
            });
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cartItem_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(productVariant_entity_1.ProductVariant)),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository,
        cartItem_repository_1.CartItemRepository,
        product_repository_1.ProductRepository,
        productVariant_repository_1.ProductVariantRepository])
], CartService);
//# sourceMappingURL=carts.service.js.map