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
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_entity_1 = require("./entities/auth-user.entity");
const auth_user_repository_1 = require("./repositories/auth-user.repository");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const auth_userRole_entity_1 = require("./entities/auth-userRole.entity");
const auth_userRole_repository_1 = require("./repositories/auth-userRole.repository");
const auth_userRoleType_entity_1 = require("./entities/auth-userRoleType.entity");
const auth_userRoleType_repository_1 = require("./repositories/auth-userRoleType.repository");
const authUserRoleType_enum_1 = require("../enums/authUserRoleType.enum");
let AuthUserService = class AuthUserService {
    constructor(authUserRepository, authUserRoleRepository, authUserRoleTypeRepository, jwtService) {
        this.authUserRepository = authUserRepository;
        this.authUserRoleRepository = authUserRoleRepository;
        this.authUserRoleTypeRepository = authUserRoleTypeRepository;
        this.jwtService = jwtService;
        this.validateEmail = async (userDto) => {
            const email = await this.authUserRepository.findOne({
                where: {
                    email: userDto.email,
                },
            });
            if (email) {
                throw new common_1.ConflictException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: ['User with this email already exists'],
                    error: 'Conflict',
                });
            }
        };
        this.validateUser = async (userId) => {
            const user = await this.authUserRepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: ['user not found'],
                    error: 'Not Found',
                });
            }
        };
    }
    async signup(signupUserDto) {
        await this.validateEmail(signupUserDto);
        try {
            const hashedPassword = await argon.hash(signupUserDto.password);
            const user = this.authUserRepository.create({
                email: signupUserDto.email,
                username: signupUserDto.username,
                password: hashedPassword,
                phone: signupUserDto.phone,
                country: signupUserDto.country,
                is_active: signupUserDto.is_active,
            });
            return await this.authUserRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['Some error occured while creating the account', error],
                error: 'Internal Server Error',
            });
        }
    }
    async signin(signinUserDto) {
        const user = await this.authUserRepository.findOne({
            where: {
                email: signinUserDto.email,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['Invalid email or password!'],
                error: 'Not Found',
            });
        }
        const passVerify = await argon.verify(user.password, signinUserDto.password);
        if (!passVerify) {
            throw new common_1.UnauthorizedException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: ['Incorrect password, please try again!'],
                error: 'Unauthorized',
            });
        }
        return await this.signToken(user.id, user.email);
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: process.env.SECRET,
        });
        return {
            access_token: access_token,
        };
    }
    async getAllUsers({ page, limit }) {
        if (isNaN(Number(page)) || isNaN(Number(limit)) || page < 0 || limit < 0) {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: ['page and limit must be of positive integers'],
                error: 'Conflict',
            });
        }
        const new_limit = limit > 10 ? 20 : limit;
        const [users, totalUsers] = await this.authUserRepository.findAndCount({
            skip: (page - 1) * new_limit,
            take: new_limit,
            order: { created_at: 'desc' },
        });
        return {
            data: users,
            page,
            limit: new_limit,
            total: totalUsers,
        };
    }
    async getUserById(id) {
        const user = await this.authUserRepository.findOne({
            where: {
                id: id,
            },
            select: ['id', 'email', 'username', 'is_active', 'country', 'phone'],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['User not found'],
                error: 'Not Found',
            });
        }
        delete user.password;
        return user;
    }
    async showUserData(req) {
        const user = await this.authUserRepository.findOne({
            where: {
                id: req.user.sub,
            },
            select: ['id', 'email', 'username', 'is_active', 'country'],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['User not found'],
                error: 'Not Found',
            });
        }
        const user_role = await this.authUserRoleRepository.findOne({
            where: {
                id: user.role_id,
            },
            select: ['id', 'title'],
        });
        if (!user_role) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['user role not found'],
                error: 'Not Found',
            });
        }
        const user_role_types = await this.authUserRoleTypeRepository.find({
            where: {
                role_id: user_role.id,
            },
        });
        const user_roles = {
            ...user_role,
            role_types: user_role_types.map((role) => ({
                id: role.id,
                role_name: role.role_name,
                permission_type: role.permission_type,
            })),
        };
        return {
            user,
            user_roles,
        };
    }
    async createUserRoles(userId) {
        try {
            const userRole = this.authUserRoleRepository.create({});
            const savedUserRole = await this.authUserRoleRepository.save(userRole);
            const role_names = ['banners', 'categories', 'products'];
            const role_types = await Promise.all(role_names.map(async (name) => {
                return this.authUserRoleTypeRepository.create({
                    role_name: name,
                    permission_type: authUserRoleType_enum_1.AuthUserRoleTypeEnum.None,
                    role_id: savedUserRole.id,
                });
            }));
            await this.validateUser(userId);
            await this.authUserRepository.update(userId, { role_id: userRole.id });
            return await this.authUserRoleTypeRepository.save(role_types);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating the role', error.message],
                error: 'Internal Server',
            });
        }
    }
    async updateUserRole(id, userRoleDto) {
        const user_role = await this.authUserRoleRepository.findOne({
            where: {
                id,
            },
        });
        if (!user_role) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['user role not found'],
                error: 'Not Found',
            });
        }
        if (userRoleDto.title) {
            await this.authUserRoleRepository.update({ id }, {
                title: userRoleDto.title,
            });
        }
        if (userRoleDto.permission_type) {
            const user_role_type = await this.authUserRoleTypeRepository.find({
                where: {
                    role_id: id,
                },
            });
            if (user_role_type.length > 0) {
                await Promise.all(user_role_type.map(async (role_type) => {
                    role_type.permission_type = userRoleDto.permission_type;
                    await this.authUserRoleTypeRepository.save(role_type);
                }));
            }
        }
        return user_role;
    }
    async deleteUserRole(id) {
        const user = await this.authUserRepository.findOne({
            where: {
                role_id: id,
            },
        });
        const user_role = await this.authUserRoleRepository.findOne({
            where: {
                id,
            },
        });
        if (!user_role) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['user role not found'],
                error: 'Not Found',
            });
        }
        const deletedUserRole = await this.authUserRoleRepository.delete(id);
        if (deletedUserRole) {
            await this.authUserRoleTypeRepository.delete({ role_id: id });
            await this.authUserRepository.update(user.id, { role_id: null });
        }
        return {
            id: `${id}`,
            message: 'user role has been removed',
        };
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_user_entity_1.AuthUser)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_userRole_entity_1.AuthUserRole)),
    __param(2, (0, typeorm_1.InjectRepository)(auth_userRoleType_entity_1.AuthUserRoleType)),
    __metadata("design:paramtypes", [auth_user_repository_1.AuthUserRepository,
        auth_userRole_repository_1.AuthUserRoleRepository,
        auth_userRoleType_repository_1.AuthUserRoleTypeRepository,
        jwt_1.JwtService])
], AuthUserService);
//# sourceMappingURL=auth-users.service.js.map