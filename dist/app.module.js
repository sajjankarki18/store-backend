"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const banners_module_1 = require("./banners/banners.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const auth_users_module_1 = require("./auth-users/auth-users.module");
const authentication_middleware_1 = require("./middlewares/authentication.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_middleware_1 = require("./middlewares/auth-middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(authentication_middleware_1.AuthenticationMiddleware)
            .exclude('/admin/auth_user/signin')
            .exclude('admin/auth_user/signup')
            .forRoutes('/admin');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: 5432,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            jwt_1.JwtModule.register({}),
            banners_module_1.BannersModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            auth_users_module_1.AuthUsersModule,
            auth_middleware_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map