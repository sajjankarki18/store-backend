import { DataSource, Repository } from 'typeorm';
import { ProductPricing } from '../entities/productPricing.entity';
export declare class ProductPricingRepository extends Repository<ProductPricing> {
    constructor(dataSource: DataSource);
}
