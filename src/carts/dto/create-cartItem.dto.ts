import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCartItemDto {
  @IsOptional()
  @IsString()
  product_title: string;

  @IsOptional()
  @IsUUID()
  product_id: string;

  @IsOptional()
  @IsUUID()
  variant_id: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  price: number;

  @IsOptional()
  @IsUUID()
  cart_id: string;
}
