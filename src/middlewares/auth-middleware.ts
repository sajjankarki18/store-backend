// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './authentication.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  providers: [AuthenticationMiddleware],
})
export class AuthModule {}
