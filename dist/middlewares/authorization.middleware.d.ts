import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthUserRepository } from 'src/auth-users/admin-auth/repositories/auth-user.repository';
import { AuthUserRoleRepository } from 'src/auth-users/admin-auth/repositories/auth-userRole.repository';
import { AuthUserRoleTypeRepository } from '../auth-users/admin-auth/repositories/auth-userRoleType.repository';
export declare class RolesGaurd implements CanActivate {
    private readonly authUsersRepository;
    private readonly authUserRoleRepository;
    private readonly authUserRoleTypeRepository;
    constructor(authUsersRepository: AuthUserRepository, authUserRoleRepository: AuthUserRoleRepository, authUserRoleTypeRepository: AuthUserRoleTypeRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
