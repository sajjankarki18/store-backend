import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthUserRoleType } from '../entities/auth-userRoleType.entity';

@Injectable()
export class AuthUserRoleTypeRepository extends Repository<AuthUserRoleType> {
  constructor(dataSource: DataSource) {
    super(AuthUserRoleType, dataSource.createEntityManager());
  }
}
