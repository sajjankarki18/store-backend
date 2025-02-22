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
exports.SignUpUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignUpUserDto {
}
exports.SignUpUserDto = SignUpUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email of the user',
        example: 'monkeyDLuffy@gmail.com',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email field is empty!' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username',
        example: 'Monkey D Luffy',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'username field is empty!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password of the email',
        example: 'abc12345',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password field is empty!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the user',
        example: '9814426031',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country where user resides',
        example: 'Nepal',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'acrive status of the user',
        example: 'The status might be either of {true/false}',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SignUpUserDto.prototype, "is_active", void 0);
//# sourceMappingURL=signup-user.dto.js.map