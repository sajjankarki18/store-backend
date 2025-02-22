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
let AuthUserService = class AuthUserService {
    constructor(authUserRepository, jwtService) {
        this.authUserRepository = authUserRepository;
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
        return user;
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_user_entity_1.AuthUser)),
    __metadata("design:paramtypes", [auth_user_repository_1.AuthUserRepository,
        jwt_1.JwtService])
], AuthUserService);
//# sourceMappingURL=auth-users.service.js.map