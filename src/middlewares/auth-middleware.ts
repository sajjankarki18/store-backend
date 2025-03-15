// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationAdminMiddleware } from './authentication.admin.middleware';
import { AuthenticationCustomerMiddleware } from './authentication.customer.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  providers: [AuthenticationAdminMiddleware, AuthenticationCustomerMiddleware],
})
export class AuthModule {}
