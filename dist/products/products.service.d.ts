import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { CreateProductVariantDto } from './dto/create-productVariant.dto';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductVariantRepository } from './repositories/productVariant.repository';
import { UpdateProductVariantDto } from './dto/update-productVariant.dto';
import { CreateProductPricingDto } from './dto/create-productPricing.dto';
import { ProductPricing } from './entities/productPricing.entity';
import { ProductPricingRepository } from './repositories/productPricing.repository';
import { UpdateProductPricingDto } from './dto/update-productPricing.dto';
import { CategoryRepository } from 'src/categories/repositories/Category.repository';
import { addProductReviewDto } from './dto/add-productReview.dto';
import { ProductReview } from './entities/productReview.entity';
import { ProductReviewRepository } from './repositories/productReview.repository';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly productsVariantRepository;
    private readonly productPricingRepository;
    private readonly categoriesRepository;
    private readonly productReviewRepository;
    constructor(productsRepository: ProductRepository, productsVariantRepository: ProductVariantRepository, productPricingRepository: ProductPricingRepository, categoriesRepository: CategoryRepository, productReviewRepository: ProductReviewRepository);
    validateProduct: (productId: string) => Promise<void>;
    createProduct(productDto: CreateProductDto): Promise<Product>;
    findProductById(id: string): Promise<{
        data: Product;
    }>;
    fetchAllProducts({ page, limit, status, query, }: {
        page: number;
        limit: number;
        status: StatusEnum;
        query: string;
    }): Promise<{
        data: Product[];
        page: number;
        limit: number;
        total: number;
    }>;
    fetchProductsData(): Promise<{
        data: Product[];
    }>;
    addProductReview(req: any, productReviewDto: addProductReviewDto): Promise<ProductReview>;
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
    createProductPricing(productPricingDto: CreateProductPricingDto): Promise<ProductPricing>;
    getProductPricingById(id: string): Promise<ProductPricing>;
    updateProductPricing(id: string, productPricingDto: UpdateProductPricingDto): Promise<ProductPricing>;
    deleteProductPricing(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
