import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';

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

  @IsEnum(StatusEnum, {
    message: 'The status must be either of published or draft',
  })
  status: StatusEnum;
}
