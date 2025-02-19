import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';

export class CreateProductDto {
  @ApiProperty({
    description: 'Title for the product',
    example: 'Samsung s25 ultra',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @ApiProperty({
    description: 'Short description for the product',
    example: 'Buy the latest samsung s21 ultra winter edition',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Enter a valid description' })
  description: string;

  @ApiProperty({
    description:
      'each product should be linked to category_id from category table',
    example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  category_id: string;

  @ApiProperty({
    description: 'Product Status',
    example:
      'The current status of product must be either of {published/draft/archieved}',
    type: String,
  })
  @IsEnum(StatusEnum, {
    message: 'The status must be either of published or draft',
  })
  @IsOptional()
  status: StatusEnum;
}
