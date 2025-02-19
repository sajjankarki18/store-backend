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
exports.CreateProductVariantDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const variants_enum_1 = require("../../enums/variants.enum");
class CreateProductVariantDto {
}
exports.CreateProductVariantDto = CreateProductVariantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'each product variant must be linked to the specific product_id from product table',
        example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
        type: String,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Variant color of the product',
        example: 'Colors -> {red/greed/orange/black/white}',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(variants_enum_1.ProductVariantColorsEnum, { message: 'Invalid variant color' }),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Variant size of the product',
        example: 'Size -> {S/M/L}',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(variants_enum_1.ProductVariantsSizeEnum, { message: 'Invalid variant size' }),
    __metadata("design:type", String)
], CreateProductVariantDto.prototype, "size", void 0);
//# sourceMappingURL=create-productVariant.dto.js.map