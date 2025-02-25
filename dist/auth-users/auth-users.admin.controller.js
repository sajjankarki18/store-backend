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
exports.AuthUserAdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_users_service_1 = require("./auth-users.service");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const signin_user_dto_1 = require("./dto/signin-user.dto");
const swagger_1 = require("@nestjs/swagger");
const update_userRole_dto_1 = require("./dto/update-userRole.dto");
let AuthUserAdminController = class AuthUserAdminController {
    constructor(authUserService) {
        this.authUserService = authUserService;
    }
    signup(signupUserDto) {
        return this.authUserService.signup(signupUserDto);
    }
    signin(signinUserDto) {
        return this.authUserService.signin(signinUserDto);
    }
    getAllUsers(page = 1, limit = 10) {
        return this.authUserService.getAllUsers({ page, limit });
    }
    getUserById(id) {
        return this.authUserService.getUserById(id);
    }
    showUserData(req) {
        return this.authUserService.showUserData(req);
    }
    createUserRoles(userId) {
        return this.authUserService.createUserRoles(userId);
    }
    updateUserRole(id, userRoleDto) {
        return this.authUserService.updateUserRole(id, userRoleDto);
    }
    deleteUserRole(id) {
        return this.authUserService.deleteUserRole(id);
    }
};
exports.AuthUserAdminController = AuthUserAdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Account' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Account created sucessfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Failed to create account' }),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignUpUserDto]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login Account' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'logged in sucessfully' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Failed to log in, please try again',
    }),
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_user_dto_1.SigninUserDto]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/all-users'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "showUserData", null);
__decorate([
    (0, common_1.Post)('/:userId/user-role'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "createUserRoles", null);
__decorate([
    (0, common_1.Put)('/user-role/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_userRole_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Delete)('/user-role/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthUserAdminController.prototype, "deleteUserRole", null);
exports.AuthUserAdminController = AuthUserAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Users'),
    (0, common_1.Controller)('/admin/auth_user'),
    __metadata("design:paramtypes", [auth_users_service_1.AuthUserService])
], AuthUserAdminController);
//# sourceMappingURL=auth-users.admin.controller.js.map