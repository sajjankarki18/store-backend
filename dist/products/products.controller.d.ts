import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    fetchProductsData(): Promise<{
        data: import("./entities/product.entity").Product[];
    }>;
}
