import { CustomerService } from './customers.service';
import { AddReviewDto } from './dto/add-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';
export declare class CustomersController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getAllCustomerReviews(): Promise<{
        data: import("./entities/customerReview.entity").CustomerReview[];
    }>;
    addReview(req: any, addReview: AddReviewDto): Promise<import("./entities/customerReview.entity").CustomerReview>;
    updateReview(id: string, editReview: EditReviewDto): Promise<import("./entities/customerReview.entity").CustomerReview>;
    deleteReview(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
