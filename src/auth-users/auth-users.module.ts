import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './admin-auth/entities/auth-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserRole } from './admin-auth/entities/auth-userRole.entity';
import { AuthUserRoleType } from './admin-auth/entities/auth-userRoleType.entity';
import { AuthUserAdminController } from './admin-auth/auth-users.admin.controller';
import { AuthUserController } from './customers-auth/auth-user.controller';
import { Customer } from '../customers/entities/customer.entity';
import { CustomersModule } from '../customers/customers.module';
import { AuthUserAdminService } from './admin-auth/auth-users.admin.service';
import { AuthUserService } from './customers-auth/auth-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthUser,
      AuthUserRole,
      AuthUserRoleType,
      Customer,
    ]),
    JwtModule.register({}),
    forwardRef(() => CustomersModule),
  ],
  controllers: [AuthUserAdminController, AuthUserController],
  providers: [AuthUserAdminService, AuthUserService],
})
export class AuthUsersModule {}
