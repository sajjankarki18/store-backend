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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const create_cartItem_dto_1 = require("./dto/create-cartItem.dto");
const swagger_1 = require("@nestjs/swagger");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    cartActions(cartItemDto) {
        return this.cartService.cartActions(cartItemDto);
    }
};
exports.CartController = CartController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add an item to the cart' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Added to cart' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Some error occured while adding an item to cart',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cartItem_dto_1.CreateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "cartActions", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Carts'),
    (0, common_1.Controller)('/carts'),
    __metadata("design:paramtypes", [carts_service_1.CartService])
], CartController);
//# sourceMappingURL=carts.controller.js.map