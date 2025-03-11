import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomerReview } from '../entities/customerReview.entity';

@Injectable()
export class CustomerRviewRepository extends Repository<CustomerReview> {
  constructor(dataSource: DataSource) {
    super(CustomerReview, dataSource.createEntityManager());
  }
}
