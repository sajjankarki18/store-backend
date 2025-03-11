import { DataSource, Repository } from 'typeorm';
import { AuthUserRole } from '../entities/auth-userRole.entity';
export declare class AuthUserRoleRepository extends Repository<AuthUserRole> {
    constructor(dataSource: DataSource);
}
