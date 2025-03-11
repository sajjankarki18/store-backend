import { AuthUserRoleType } from './auth-userRoleType.entity';
import { AuthUser } from './auth-user.entity';
export declare class AuthUserRole {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    user_role_type: AuthUserRoleType[];
    auth_user: AuthUser[];
}
