import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPricingDto } from './create-productPricing.dto';

export class UpdateProductPricingDto extends PartialType(
  CreateProductPricingDto,
) {
  readonly id: string;
}
