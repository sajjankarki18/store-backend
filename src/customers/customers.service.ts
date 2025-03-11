import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerReview } from './entities/customerReview.entity';
import { CustomerRviewRepository } from './repositories/customerReview.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: CustomerRepository,
    @InjectRepository(CustomerReview)
    private readonly customerReviewRepository: CustomerRviewRepository,
  ) {}
}
