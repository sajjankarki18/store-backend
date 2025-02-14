import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import {
  ProductVariantColorsEnum,
  ProductVariantsSizeEnum,
} from 'src/enums/variants.enum';

export class CreateProductVariantDto {
  @IsUUID()
  product_id: string;

  @IsOptional()
  @IsEnum(ProductVariantColorsEnum, { message: 'Invalid variant color' })
  color: ProductVariantColorsEnum;

  @IsOptional()
  @IsEnum(ProductVariantsSizeEnum, { message: 'Invalid variant size' })
  size: ProductVariantsSizeEnum;
}
