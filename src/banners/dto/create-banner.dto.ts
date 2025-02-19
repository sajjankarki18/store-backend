import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreateBannerDto {
  @ApiProperty({
    description: 'Title of the banner',
    example: 'Best winter sale with 50% off',
    type: String,
  })
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @ApiProperty({
    description: 'Description for the banners for display purposes',
    example: 'Buy your best winter clothings and kitchen supplements',
    type: String,
  })
  @IsString({ message: 'Enter a valid description' })
  description: string;

  @ApiProperty({
    description: 'redirections when a banner gets clicked',
    example:
      'Gets redirected to either of these pages {products/categories/collections}',
    type: String,
  })
  @IsOptional()
  @IsEnum(RedirectTypeEnum, {
    message:
      'The redirect-type should be either of {products/category/collections}',
  })
  redirect_type: RedirectTypeEnum;

  @ApiProperty({
    description: 'redirect_id of the specific redirect type',
    example: '64dbe857-9e4f-4a6c-bd89-1b5e5d3fcd99',
    type: UUID,
  })
  @IsOptional()
  @IsString({ message: 'Invalid redirect_id' })
  redirect_id: string;
}
