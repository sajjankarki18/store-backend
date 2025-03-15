import { DataSource, Repository } from 'typeorm';
import { ProductReview } from '../entities/productReview.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductReviewRepository extends Repository<ProductReview> {
  constructor(dataSource: DataSource) {
    super(ProductReview, dataSource.createEntityManager());
  }
}
