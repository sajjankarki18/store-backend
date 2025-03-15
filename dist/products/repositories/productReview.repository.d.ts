import { DataSource, Repository } from 'typeorm';
import { ProductReview } from '../entities/productReview.entity';
export declare class ProductReviewRepository extends Repository<ProductReview> {
    constructor(dataSource: DataSource);
}
