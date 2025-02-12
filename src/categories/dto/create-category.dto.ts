import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Enter a valid description' })
  description: string;

  @IsOptional()
  @IsUUID()
  parent_id: string;

  @IsOptional()
  @IsString({ message: 'Invalid image' })
  image_url: string;
}
