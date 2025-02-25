import { AuthUserService } from './auth-users.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserRoleDto } from './dto/update-userRole.dto';
export declare class AuthUserAdminController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    signup(signupUserDto: SignUpUserDto): Promise<import("./entities/auth-user.entity").AuthUser>;
    signin(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    getAllUsers(page?: number, limit?: number): Promise<{
        data: import("./entities/auth-user.entity").AuthUser[];
        page: number;
        limit: number;
        total: number;
    }>;
    getUserById(id: string): Promise<import("./entities/auth-user.entity").AuthUser>;
    showUserData(req: any): Promise<{
        user: import("./entities/auth-user.entity").AuthUser;
        user_roles: import("./entities/auth-userRole.entity").AuthUserRole;
    }>;
    createUserRoles(userId: string): Promise<import("./entities/auth-userRoleType.entity").AuthUserRoleType[]>;
    updateUserRole(id: string, userRoleDto: UpdateUserRoleDto): Promise<import("./entities/auth-userRole.entity").AuthUserRole>;
    deleteUserRole(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
