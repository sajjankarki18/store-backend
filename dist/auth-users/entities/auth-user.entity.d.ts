import { AuthUserRole } from './auth-userRole.entity';
export declare class AuthUser {
    id: string;
    email: string;
    username: string;
    password: string;
    is_active: boolean;
    country?: string;
    phone?: string;
    created_at: Date;
    deleted_at: Date;
    updated_at: Date;
    auth_user_role: AuthUserRole;
    role_id: string;
}
