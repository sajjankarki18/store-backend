"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsersModule = void 0;
const common_1 = require("@nestjs/common");
const auth_users_service_1 = require("./auth-users.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_entity_1 = require("./entities/auth-user.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_userRole_entity_1 = require("./entities/auth-userRole.entity");
const auth_userRoleType_entity_1 = require("./entities/auth-userRoleType.entity");
const auth_users_admin_controller_1 = require("./auth-users.admin.controller");
let AuthUsersModule = class AuthUsersModule {
};
exports.AuthUsersModule = AuthUsersModule;
exports.AuthUsersModule = AuthUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([auth_user_entity_1.AuthUser, auth_userRole_entity_1.AuthUserRole, auth_userRoleType_entity_1.AuthUserRoleType]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [auth_users_admin_controller_1.AuthUserAdminController],
        providers: [auth_users_service_1.AuthUserService],
    })
], AuthUsersModule);
//# sourceMappingURL=auth-users.module.js.map