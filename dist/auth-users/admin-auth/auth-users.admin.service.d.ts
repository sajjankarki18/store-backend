import { AuthUser } from './entities/auth-user.entity';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRole } from './entities/auth-userRole.entity';
import { AuthUserRoleRepository } from './repositories/auth-userRole.repository';
import { AuthUserRoleType } from './entities/auth-userRoleType.entity';
import { AuthUserRoleTypeRepository } from './repositories/auth-userRoleType.repository';
import { UpdateUserRoleDto } from './dto/create-userRole.dto';
export declare class AuthUserAdminService {
    private readonly authUserRepository;
    private readonly authUserRoleRepository;
    private readonly authUserRoleTypeRepository;
    private readonly jwtService;
    constructor(authUserRepository: AuthUserRepository, authUserRoleRepository: AuthUserRoleRepository, authUserRoleTypeRepository: AuthUserRoleTypeRepository, jwtService: JwtService);
    validateEmail: (userDto: SignUpUserDto) => Promise<void>;
    validateUser: (userId: string) => Promise<void>;
    signup(signupUserDto: SignUpUserDto): Promise<AuthUser>;
    signin(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
    getAllUsers({ page, limit }: {
        page: number;
        limit: number;
    }): Promise<{
        data: AuthUser[];
        page: number;
        limit: number;
        total: number;
    }>;
    getUserById(id: string): Promise<AuthUser>;
    showUserData(req: any): Promise<{
        user: AuthUser;
        user_roles: AuthUserRole;
    }>;
    createUserRoles(userId: string): Promise<AuthUserRoleType[]>;
    updateUserRole(id: string, userRoleDto: UpdateUserRoleDto): Promise<AuthUserRole>;
    deleteUserRole(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
