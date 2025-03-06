import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCartDto {
  @IsOptional()
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  total_price: number;

  @IsOptional()
  @IsBoolean()
  cart_status: string;
}
