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
const customer_entity_1 = require("../../customers/entities/customer.entity");
const customer_repository_1 = require("../../customers/repositories/customer.repository");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthUserService = class AuthUserService {
    constructor(customersRepository, jwtService) {
        this.customersRepository = customersRepository;
        this.jwtService = jwtService;
        this.signToken = async (userId, email) => {
            const jwtSECRET = process.env.SECRET;
            if (!jwtSECRET) {
                throw new Error('JWT secret is not defined');
            }
            const payload = {
                sub: userId,
                email,
            };
            const access_token = await this.jwtService.signAsync(payload, {
                expiresIn: '1hr',
                secret: process.env.SECRET,
            });
            return {
                access_token: access_token,
            };
        };
    }
    async signup(createUserDto) {
        const email = await this.customersRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (email) {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: ['Email already in use!'],
                error: 'Conflct',
            });
        }
        try {
            const hashedPass = await argon.hash(createUserDto.password);
            const user = this.customersRepository.create({
                email: createUserDto.email,
                first_name: createUserDto.first_name,
                last_name: createUserDto.last_name,
                password: hashedPass,
                phone_number: createUserDto.phone,
                country: createUserDto.country,
            });
            return await this.customersRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['Something went wrong, please try again!', error],
                error: 'Internal Server Error',
            });
        }
    }
    async loginUserDto(loginUserDto) {
        const user = await this.customersRepository.findOne({
            where: {
                email: loginUserDto.email,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [
                    'email not found, Create a new account if you dont have one!',
                ],
                error: 'Not Found',
            });
        }
        const verifyPass = await argon.verify(user.password, loginUserDto.password);
        if (!verifyPass) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Incorrect password, please try again!'],
                error: 'Not Found',
            });
        }
        return this.signToken(user.id, user.email);
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        jwt_1.JwtService])
], AuthUserService);
//# sourceMappingURL=auth-user.service.js.map