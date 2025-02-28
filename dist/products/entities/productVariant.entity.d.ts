import { ProductVariantColorsEnum, ProductVariantsSizeEnum } from 'src/enums/variants.enum';
export declare class ProductVariant {
    id: string;
    product_id: string;
    color: ProductVariantColorsEnum;
    size: ProductVariantsSizeEnum;
    in_stock: true;
    created_at: Date;
    deleted_at: Date;
}
