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
exports.CreateCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_enum_1 = require("../../enums/status.enum");
const bson_typings_1 = require("typeorm/driver/mongodb/bson.typings");
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Title of the category',
        example: 'Categories -> {electornics, tech, clothings}',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Enter a valid title' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'A short description for the category',
        example: 'The electonics items include mobile, laptops, Computers',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Enter a valid description' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'ID of the parent category (null if it is a main category)',
        example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
        type: bson_typings_1.UUID,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "parent_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image url for the specific category',
        example: 'https://example.com/images/electronics.jpg',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Invalid image' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Status',
        example: 'The current status of category must be either of {published/draft/archieved}',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(status_enum_1.StatusEnum, {
        message: 'The status must be either of published or draft',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "status", void 0);
//# sourceMappingURL=create-category.dto.js.map