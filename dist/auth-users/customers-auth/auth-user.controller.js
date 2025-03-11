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
exports.AuthUserController = void 0;
const common_1 = require("@nestjs/common");
const auth_user_service_1 = require("./auth-user.service");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
let AuthUserController = class AuthUserController {
    constructor(authUserService) {
        this.authUserService = authUserService;
    }
    signup(createUserDto) {
        return this.authUserService.signup(createUserDto);
    }
    login(loginUserDto) {
        return this.authUserService.loginUserDto(loginUserDto);
    }
};
exports.AuthUserController = AuthUserController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthUserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthUserController.prototype, "login", null);
exports.AuthUserController = AuthUserController = __decorate([
    (0, common_1.Controller)('/auth_user'),
    __metadata("design:paramtypes", [auth_user_service_1.AuthUserService])
], AuthUserController);
//# sourceMappingURL=auth-user.controller.js.map