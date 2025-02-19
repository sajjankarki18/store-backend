import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreateCategoryDto {
  @ApiProperty({
    title: 'Title of the category',
    example: 'Categories -> {electornics, tech, clothings}',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @ApiProperty({
    title: 'A short description for the category',
    example: 'The electonics items include mobile, laptops, Computers',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Enter a valid description' })
  description: string;

  @ApiProperty({
    title: 'ID of the parent category (null if it is a main category)',
    example: '467aaf30-02b1-42c3-b0aa-91f25020e4ca',
    type: UUID,
  })
  @IsOptional()
  @IsUUID()
  parent_id: string;

  @ApiProperty({
    description: 'Image url for the specific category',
    example: 'https://example.com/images/electronics.jpg',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Invalid image' })
  image_url: string;

  @ApiProperty({
    description: 'Category Status',
    example:
      'The current status of category must be either of {published/draft/archieved}',
    type: String,
  })
  @IsOptional()
  @IsEnum(StatusEnum, {
    message: 'The status must be either of published or draft',
  })
  status: StatusEnum;
}
