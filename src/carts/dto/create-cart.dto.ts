import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsNumber()
  total_price: string;

  @IsOptional()
  @IsBoolean()
  cart_status: string;
}
