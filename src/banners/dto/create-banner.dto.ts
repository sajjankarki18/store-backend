import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';

export class CreateBannerDto {
  @IsString({ message: 'Enter a valid title' })
  title: string;

  @IsString({ message: 'Enter a valid description' })
  description: string;

  @IsOptional()
  @IsEnum(RedirectTypeEnum, {
    message:
      'The redirect-type should be either of {products/category/collections}',
  })
  redirect_type: RedirectTypeEnum;

  @IsOptional()
  @IsString({ message: 'Invalid redirect_id' })
  redirect_id: string;
}
