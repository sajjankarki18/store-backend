import { DataSource, Repository } from 'typeorm';
import { AuthUser } from '../entities/auth-user.entity';
export declare class AuthUserRepository extends Repository<AuthUser> {
    constructor(dataSource: DataSource);
}
