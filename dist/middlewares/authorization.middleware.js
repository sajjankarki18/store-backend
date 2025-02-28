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
exports.RolesGaurd = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_entity_1 = require("../auth-users/entities/auth-user.entity");
const auth_user_repository_1 = require("../auth-users/repositories/auth-user.repository");
const auth_userRole_entity_1 = require("../auth-users/entities/auth-userRole.entity");
const auth_userRole_repository_1 = require("../auth-users/repositories/auth-userRole.repository");
const auth_userRoleType_entity_1 = require("../auth-users/entities/auth-userRoleType.entity");
const auth_userRoleType_repository_1 = require("../auth-users/repositories/auth-userRoleType.repository");
let RolesGaurd = class RolesGaurd {
    constructor(authUsersRepository, authUserRoleRepository, authUserRoleTypeRepository) {
        this.authUsersRepository = authUsersRepository;
        this.authUserRoleRepository = authUserRoleRepository;
        this.authUserRoleTypeRepository = authUserRoleTypeRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);
        if (!user) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['please login to continue'],
                error: 'Forbidden',
            });
        }
        return false;
    }
};
exports.RolesGaurd = RolesGaurd;
exports.RolesGaurd = RolesGaurd = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_user_entity_1.AuthUser)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_userRole_entity_1.AuthUserRole)),
    __param(2, (0, typeorm_1.InjectRepository)(auth_userRoleType_entity_1.AuthUserRoleType)),
    __metadata("design:paramtypes", [auth_user_repository_1.AuthUserRepository,
        auth_userRole_repository_1.AuthUserRoleRepository,
        auth_userRoleType_repository_1.AuthUserRoleTypeRepository])
], RolesGaurd);
//# sourceMappingURL=authorization.middleware.js.map