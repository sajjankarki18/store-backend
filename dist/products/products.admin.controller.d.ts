import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-productVariant.dto';
import { UpdateProductVariantDto } from './dto/update-productVariant.dto';
import { CreateProductPricingDto } from './dto/create-productPricing.dto';
import { UpdateProductPricingDto } from './dto/update-productPricing.dto';
import { StatusEnum } from 'src/enums/status.enum';
export declare class ProductsAdminController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(productDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    fetchAllProducts(page: number, limit: number, status: StatusEnum, query: string): Promise<{
        data: import("./entities/product.entity").Product[];
        page: number;
        limit: number;
        total: number;
    }>;
    searchProduct(query: string): Promise<{
        data: import("./entities/product.entity").Product[];
        total: number;
    }>;
    updateProduct(id: string, productDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    deleteProduct(id: string): Promise<{
        id: string;
        message: string;
    }>;
    createProductVariant(productVariantDto: CreateProductVariantDto): Promise<import("./entities/productVariant.entity").ProductVariant>;
    getProductVariantById(id: string): Promise<import("./entities/productVariant.entity").ProductVariant>;
    updateProductVariant(id: string, productVariantDto: UpdateProductVariantDto): Promise<import("./entities/productVariant.entity").ProductVariant>;
    deleteProductVariant(id: string): Promise<{
        id: string;
        message: string;
    }>;
    createProductPricing(productPricingDto: CreateProductPricingDto): Promise<import("./entities/productPricing.entity").ProductPricing>;
    getProductPricingById(id: string): Promise<import("./entities/productPricing.entity").ProductPricing>;
    updateProductPricing(id: string, productPricingDto: UpdateProductPricingDto): Promise<import("./entities/productPricing.entity").ProductPricing>;
    deleteProductPricing(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
