import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';

export class CreateProductDto {
  @IsOptional()
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Enter a valid description' })
  description: string;

  @IsOptional()
  @IsUUID()
  category_id: string;

  @IsEnum(StatusEnum, {
    message: 'The status must be either of published or draft',
  })
  @IsOptional()
  status: StatusEnum;
}
