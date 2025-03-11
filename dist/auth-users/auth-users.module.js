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
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_entity_1 = require("./admin-auth/entities/auth-user.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_userRole_entity_1 = require("./admin-auth/entities/auth-userRole.entity");
const auth_userRoleType_entity_1 = require("./admin-auth/entities/auth-userRoleType.entity");
const auth_users_admin_controller_1 = require("./admin-auth/auth-users.admin.controller");
const auth_user_controller_1 = require("./customers-auth/auth-user.controller");
const customer_entity_1 = require("../customers/entities/customer.entity");
const customers_module_1 = require("../customers/customers.module");
const auth_users_admin_service_1 = require("./admin-auth/auth-users.admin.service");
const auth_user_service_1 = require("./customers-auth/auth-user.service");
let AuthUsersModule = class AuthUsersModule {
};
exports.AuthUsersModule = AuthUsersModule;
exports.AuthUsersModule = AuthUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                auth_user_entity_1.AuthUser,
                auth_userRole_entity_1.AuthUserRole,
                auth_userRoleType_entity_1.AuthUserRoleType,
                customer_entity_1.Customer,
            ]),
            jwt_1.JwtModule.register({}),
            (0, common_1.forwardRef)(() => customers_module_1.CustomersModule),
        ],
        controllers: [auth_users_admin_controller_1.AuthUserAdminController, auth_user_controller_1.AuthUserController],
        providers: [auth_users_admin_service_1.AuthUserAdminService, auth_user_service_1.AuthUserService],
    })
], AuthUsersModule);
//# sourceMappingURL=auth-users.module.js.map