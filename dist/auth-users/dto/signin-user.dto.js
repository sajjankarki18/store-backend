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
exports.SigninUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SigninUserDto {
}
exports.SigninUserDto = SigninUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email of the user',
        example: 'monkeyDLuffy@gmail.com',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email field is empty!' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SigninUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password of the email',
        example: 'abc12345',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password field is empty!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SigninUserDto.prototype, "password", void 0);
//# sourceMappingURL=signin-user.dto.js.map