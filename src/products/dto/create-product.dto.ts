import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @IsString({ message: 'Enter a valid description' })
  description: string;

  @IsOptional()
  @IsUUID()
  category_id: string;
}
