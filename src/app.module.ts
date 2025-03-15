import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersModule } from './banners/banners.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { AuthenticationAdminMiddleware } from './middlewares/authentication.admin.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './middlewares/auth-middleware';
import { CartsModule } from './carts/carts.module';
import { CustomersModule } from './customers/customers.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthenticationCustomerMiddleware } from './middlewares/authentication.customer.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({}),
    BannersModule,
    ProductsModule,
    CategoriesModule,
    AuthUsersModule,
    AuthModule,
    CartsModule,
    CustomersModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationAdminMiddleware)
      .exclude('/admin/auth_user/signin')
      .exclude('admin/auth_user/signup')
      .forRoutes('/admin');

    consumer
      .apply(AuthenticationCustomerMiddleware)
      .exclude('/auth_user/signup')
      .exclude('/auth_user/login')
      .forRoutes('/customers/review', '/products/add-review');
  }
}
