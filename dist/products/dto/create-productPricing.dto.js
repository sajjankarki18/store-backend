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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductPricingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const currency_enum_1 = require("../../enums/currency.enum");
class CreateProductPricingDto {
}
exports.CreateProductPricingDto = CreateProductPricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Each product variant must be linked to a specific variant from the product table.',
        example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
        type: String,
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductPricingDto.prototype, "variant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country code in ISO 3166-1 alpha-2 format (e.g., US, IN, UK).',
        example: 'US',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductPricingDto.prototype, "country_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency type for the pricing (e.g., USD, EUR, INR).',
        example: 'USD',
        enum: currency_enum_1.CurrencyEnum,
    }),
    (0, class_validator_1.IsEnum)(currency_enum_1.CurrencyEnum, { message: 'Invalid currency type' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductPricingDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base price of the product.',
        example: 100.0,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductPricingDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Selling price after applying discounts or promotions.',
        example: 80.0,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductPricingDto.prototype, "selling_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Crossed price (original price before discount).',
        example: 120.0,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductPricingDto.prototype, "crossed_price", void 0);
//# sourceMappingURL=create-productPricing.dto.js.map