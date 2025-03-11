import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from '../auth-users/admin-auth/entities/auth-user.entity';
import { AuthUserRepository } from 'src/auth-users/admin-auth/repositories/auth-user.repository';
import { AuthUserRole } from '../auth-users/admin-auth/entities/auth-userRole.entity';
import { AuthUserRoleRepository } from 'src/auth-users/admin-auth/repositories/auth-userRole.repository';
import { AuthUserRoleType } from 'src/auth-users/admin-auth/entities/auth-userRoleType.entity';
import { AuthUserRoleTypeRepository } from '../auth-users/admin-auth/repositories/auth-userRoleType.repository';
import { Request } from 'express';

@Injectable()
export class RolesGaurd implements CanActivate {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUsersRepository: AuthUserRepository,
    @InjectRepository(AuthUserRole)
    private readonly authUserRoleRepository: AuthUserRoleRepository,
    @InjectRepository(AuthUserRoleType)
    private readonly authUserRoleTypeRepository: AuthUserRoleTypeRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['please login to continue'],
        error: 'Forbidden',
      });
    }
    return false;
  }
}
