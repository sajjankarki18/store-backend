import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductPricing } from '../entities/productPricing.entity';

@Injectable()
export class ProductPricingRepository extends Repository<ProductPricing> {
  constructor(dataSource: DataSource) {
    super(ProductPricing, dataSource.createEntityManager());
  }
}
