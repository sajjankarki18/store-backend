import { DataSource, Repository } from 'typeorm';
import { CollectionRedirect } from '../entities/CollectionRedirect.entity';
export declare class CollectionredirectRepository extends Repository<CollectionRedirect> {
    constructor(dataSource: DataSource);
}
