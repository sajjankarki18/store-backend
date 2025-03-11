import { CustomerRepository } from './repositories/customer.repository';
import { CustomerRviewRepository } from './repositories/customerReview.repository';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly customerReviewRepository;
    constructor(customerRepository: CustomerRepository, customerReviewRepository: CustomerRviewRepository);
}
