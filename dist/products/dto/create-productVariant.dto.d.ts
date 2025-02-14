import { ProductVariantColorsEnum, ProductVariantsSizeEnum } from 'src/enums/variants.enum';
export declare class CreateProductVariantDto {
    product_id: string;
    color: ProductVariantColorsEnum;
    size: ProductVariantsSizeEnum;
}
