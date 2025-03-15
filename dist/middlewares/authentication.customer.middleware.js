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
exports.AuthenticationCustomerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthenticationCustomerMiddleware = class AuthenticationCustomerMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const authHeaders = req.headers.authorization;
        if (!authHeaders?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: ['Please login to continue...'],
                error: 'Unauthorized',
            });
        }
        const token = authHeaders.split(' ')[1];
        const decodedToken = await this.jwtService.verify(token, {
            secret: process.env.SECRET,
        });
        req.user = decodedToken;
        next();
        try {
        }
        catch (error) {
            throw new common_1.UnauthorizedException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: [`Session expired, please login to continue`, error.message],
                error: 'Unauthorized',
            });
        }
    }
};
exports.AuthenticationCustomerMiddleware = AuthenticationCustomerMiddleware;
exports.AuthenticationCustomerMiddleware = AuthenticationCustomerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthenticationCustomerMiddleware);
//# sourceMappingURL=authentication.customer.middleware.js.map