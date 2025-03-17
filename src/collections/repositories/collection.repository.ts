import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';

@Injectable()
export class CollectionRepository extends Repository<Collection> {
  constructor(dataSource: DataSource) {
    super(Collection, dataSource.createEntityManager());
  }
}
