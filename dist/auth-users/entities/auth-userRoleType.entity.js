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
exports.AuthUserRoleType = void 0;
const authUserRoleType_enum_1 = require("../../enums/authUserRoleType.enum");
const typeorm_1 = require("typeorm");
const auth_userRole_entity_1 = require("./auth-userRole.entity");
let AuthUserRoleType = class AuthUserRoleType {
};
exports.AuthUserRoleType = AuthUserRoleType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuthUserRoleType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuthUserRoleType.prototype, "role_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: authUserRoleType_enum_1.AuthUserRoleTypeEnum.None }),
    __metadata("design:type", String)
], AuthUserRoleType.prototype, "permission_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_userRole_entity_1.AuthUserRole, (auth_user_role) => auth_user_role.user_role_type),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", auth_userRole_entity_1.AuthUserRole)
], AuthUserRoleType.prototype, "user_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuthUserRoleType.prototype, "role_id", void 0);
exports.AuthUserRoleType = AuthUserRoleType = __decorate([
    (0, typeorm_1.Entity)()
], AuthUserRoleType);
//# sourceMappingURL=auth-userRoleType.entity.js.map