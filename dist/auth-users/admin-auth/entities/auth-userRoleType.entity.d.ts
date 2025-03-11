import { AuthUserRoleTypeEnum } from 'src/enums/authUserRoleType.enum';
import { AuthUserRole } from './auth-userRole.entity';
export declare class AuthUserRoleType {
    id: string;
    role_name: string;
    permission_type: AuthUserRoleTypeEnum;
    user_role: AuthUserRole;
    role_id: string;
}
