import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthUser } from '../entities/auth-user.entity';

@Injectable()
export class AuthUserRepository extends Repository<AuthUser> {
  constructor(dataSource: DataSource) {
    super(AuthUser, dataSource.createEntityManager());
  }
}
