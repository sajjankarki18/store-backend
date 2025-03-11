import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserRoleDto } from './dto/update-userRole.dto';
import { AuthUserAdminService } from './auth-users.admin.service';
export declare class AuthUserAdminController {
    private readonly authUserService;
    constructor(authUserService: AuthUserAdminService);
    signup(signupUserDto: SignUpUserDto): Promise<import("./entities/auth-user.entity").AuthUser>;
    signin(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    showUserData(req: any): Promise<{
        user: import("./entities/auth-user.entity").AuthUser;
        user_roles: import("./entities/auth-userRole.entity").AuthUserRole;
    }>;
    getAllUsers(page?: number, limit?: number): Promise<{
        data: import("./entities/auth-user.entity").AuthUser[];
        page: number;
        limit: number;
        total: number;
    }>;
    getUserById(id: string): Promise<import("./entities/auth-user.entity").AuthUser>;
    createUserRoles(userId: string): Promise<import("./entities/auth-userRoleType.entity").AuthUserRoleType[]>;
    updateUserRole(id: string, userRoleDto: UpdateUserRoleDto): Promise<import("./entities/auth-userRole.entity").AuthUserRole>;
    deleteUserRole(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
