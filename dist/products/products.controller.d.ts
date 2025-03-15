import { ProductsService } from './products.service';
import { addProductReviewDto } from './dto/add-productReview.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    fetchProductsData(): Promise<{
        data: import("./entities/product.entity").Product[];
    }>;
    addProductReview(req: any, productReviewDto: addProductReviewDto): Promise<import("./entities/productReview.entity").ProductReview>;
}
