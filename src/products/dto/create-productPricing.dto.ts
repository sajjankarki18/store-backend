import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { CurrencyEnum } from 'src/enums/currency.enum';

export class CreateProductPricingDto {
  @ApiProperty({
    description:
      'Each product variant must be linked to a specific variant from the product table.',
    example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  variant_id: string;

  @ApiProperty({
    description:
      'Country code in ISO 3166-1 alpha-2 format (e.g., US, IN, UK).',
    example: 'US',
    type: String,
  })
  @IsString()
  @IsOptional()
  country_code: string;

  @ApiProperty({
    description: 'Currency type for the pricing (e.g., USD, EUR, INR).',
    example: 'USD',
    enum: CurrencyEnum,
  })
  @IsEnum(CurrencyEnum, { message: 'Invalid currency type' })
  @IsOptional()
  currency: CurrencyEnum;

  @ApiProperty({
    description: 'Base price of the product.',
    example: 100.0,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Selling price after applying discounts or promotions.',
    example: 80.0,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  selling_price: number;

  @ApiProperty({
    description: 'Crossed price (original price before discount).',
    example: 120.0,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  crossed_price: number;
}
