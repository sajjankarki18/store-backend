import { DataSource, Repository } from 'typeorm';
import { AuthUserRoleType } from '../entities/auth-userRoleType.entity';
export declare class AuthUserRoleTypeRepository extends Repository<AuthUserRoleType> {
    constructor(dataSource: DataSource);
}
