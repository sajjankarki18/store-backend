import { CartRepository } from 'src/carts/repositories/cart.repository';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
export declare class InsightsService {
    private readonly cartRepository;
    private readonly productRepository;
    private readonly customerRepository;
    constructor(cartRepository: CartRepository, productRepository: ProductRepository, customerRepository: CustomerRepository);
    getInSightsData(): Promise<{
        data: any[];
    }>;
}
