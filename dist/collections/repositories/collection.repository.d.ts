import { DataSource, Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
export declare class CollectionRepository extends Repository<Collection> {
    constructor(dataSource: DataSource);
}
