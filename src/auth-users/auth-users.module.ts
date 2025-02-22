import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-users.controller';
import { AuthUserService } from './auth-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './entities/auth-user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser]), JwtModule.register({})],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUsersModule {}
