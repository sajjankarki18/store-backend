import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class UpdateProductDto extends PartialType(CreateCategoryDto) {
  readonly id: string;
}
