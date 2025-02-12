import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductRepository);
    createProduct(productDto: CreateProductDto): Promise<Product>;
    findProductById(id: string): Promise<Product>;
}
