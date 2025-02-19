import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ProductVariantColorsEnum,
  ProductVariantsSizeEnum,
} from 'src/enums/variants.enum';

export class CreateProductVariantDto {
  @ApiProperty({
    description:
      'each product variant must be linked to the specific product_id from product table',
    example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
    type: String,
  })
  @IsUUID()
  product_id: string;

  @ApiProperty({
    description: 'Variant color of the product',
    example: 'Colors -> {red/greed/orange/black/white}',
    type: String,
  })
  @IsOptional()
  @IsEnum(ProductVariantColorsEnum, { message: 'Invalid variant color' })
  color: ProductVariantColorsEnum;

  @ApiProperty({
    description: 'Variant size of the product',
    example: 'Size -> {S/M/L}',
    type: String,
  })
  @IsOptional()
  @IsEnum(ProductVariantsSizeEnum, { message: 'Invalid variant size' })
  size: ProductVariantsSizeEnum;
}
