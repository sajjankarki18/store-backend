import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantDto } from './create-productVariant.dto';

export class UpdateProductVariantDto extends PartialType(
  CreateProductVariantDto,
) {
  readonly id: string;
}
