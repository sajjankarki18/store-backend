import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class addProductReviewDto {
  @ApiProperty({
    description: 'Add a review for particular product',
    example: 'The product is amazing',
    type: String,
  })
  @IsOptional()
  @IsString()
  review: string;

  @IsOptional()
  @IsUUID()
  product_id: string;

  @IsOptional()
  @IsUUID()
  customer_id: string;

  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty({
    description: 'Ratings for the product',
    example:
      'Solid ratings of 5 or 4. 5, if you are satisfied with the products',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  ratings: number;
}
