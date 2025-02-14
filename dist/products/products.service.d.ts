import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-productVariant.dto';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductVariantRepository } from './repositories/productVariant.repository';
import { UpdateProductVariantDto } from './dto/update-productVariant.dto';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly productsVariantRepository;
    constructor(productsRepository: ProductRepository, productsVariantRepository: ProductVariantRepository);
    createProduct(productDto: CreateProductDto): Promise<Product>;
    findProductById(id: string): Promise<Product>;
    fetchAllProducts({ page, limit, }: {
        page: number;
        limit: number;
    }): Promise<{
        data: Product[];
        page: number;
        limit: number;
        total: number;
    }>;
    searchProduct(query: string): Promise<{
        data: Product[];
        total: number;
    }>;
    updateProduct(id: string, productDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<{
        id: string;
        message: string;
    }>;
    createProductVariant(productVariantDto: CreateProductVariantDto): Promise<ProductVariant>;
    getProductVariantById(variantId: string): Promise<ProductVariant>;
    updateProductVariant(id: string, productVariantDto: UpdateProductVariantDto): Promise<ProductVariant>;
    deleteProductVariant(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
