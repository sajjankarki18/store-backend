import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddReviewDto {
  @ApiProperty({
    description: 'Add a review description',
    example: 'The products are amazing',
    type: String,
  })
  @IsOptional()
  @IsString()
  review: string;

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
