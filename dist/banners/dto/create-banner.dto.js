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
exports.CreateBannerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const redirectTypes_enum_1 = require("../../enums/redirectTypes.enum");
const bson_typings_1 = require("typeorm/driver/mongodb/bson.typings");
class CreateBannerDto {
}
exports.CreateBannerDto = CreateBannerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the banner',
        example: 'Best winter sale with 50% off',
        type: String,
    }),
    (0, class_validator_1.IsString)({ message: 'Enter a valid title' }),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description for the banners for display purposes',
        example: 'Buy your best winter clothings and kitchen supplements',
        type: String,
    }),
    (0, class_validator_1.IsString)({ message: 'Enter a valid description' }),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'redirections when a banner gets clicked',
        example: 'Gets redirected to either of these pages {products/categories/collections}',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(redirectTypes_enum_1.RedirectTypeEnum, {
        message: 'The redirect-type should be either of {products/category/collections}',
    }),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "redirect_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'redirect_id of the specific redirect type',
        example: '64dbe857-9e4f-4a6c-bd89-1b5e5d3fcd99',
        type: bson_typings_1.UUID,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Invalid redirect_id' }),
    __metadata("design:type", String)
], CreateBannerDto.prototype, "redirect_id", void 0);
//# sourceMappingURL=create-banner.dto.js.map