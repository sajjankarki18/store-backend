import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './entities/auth-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRole } from './entities/auth-userRole.entity';
import { AuthUserRoleType } from './entities/auth-userRoleType.entity';
import { AuthUserAdminController } from './auth-users.admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUser, AuthUserRole, AuthUserRoleType]),
    JwtModule.register({}),
  ],
  controllers: [AuthUserAdminController],
  providers: [AuthUserService],
})
export class AuthUsersModule {}
