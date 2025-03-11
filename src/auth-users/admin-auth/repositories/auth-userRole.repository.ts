import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthUserRole } from '../entities/auth-userRole.entity';

@Injectable()
export class AuthUserRoleRepository extends Repository<AuthUserRole> {
  constructor(dataSource: DataSource) {
    super(AuthUserRole, dataSource.createEntityManager());
  }
}
