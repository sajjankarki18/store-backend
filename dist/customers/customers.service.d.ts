import { CustomerRepository } from './repositories/customer.repository';
import { CustomerReview } from './entities/customerReview.entity';
import { CustomerRviewRepository } from './repositories/customerReview.repository';
import { AddReviewDto } from './dto/add-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly customerReviewRepository;
    constructor(customerRepository: CustomerRepository, customerReviewRepository: CustomerRviewRepository);
    getAllCustomerReviews(): Promise<{
        data: CustomerReview[];
    }>;
    addReview(req: any, addReview: AddReviewDto): Promise<CustomerReview>;
    updateReview(id: string, editReview: EditReviewDto): Promise<CustomerReview>;
    deleteReview(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
