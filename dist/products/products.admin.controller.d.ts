import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsAdminController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(productDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    findProductById(id: string): Promise<import("./entities/product.entity").Product>;
}
