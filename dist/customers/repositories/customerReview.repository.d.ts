import { DataSource, Repository } from 'typeorm';
import { CustomerReview } from '../entities/customerReview.entity';
export declare class CustomerRviewRepository extends Repository<CustomerReview> {
    constructor(dataSource: DataSource);
}
