import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CollectionRedirect } from '../entities/CollectionRedirect.entity';

@Injectable()
export class CollectionredirectRepository extends Repository<CollectionRedirect> {
  constructor(dataSource: DataSource) {
    super(CollectionRedirect, dataSource.createEntityManager());
  }
}
