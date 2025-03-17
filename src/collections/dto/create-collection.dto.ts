import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';

export class CreateCollectionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(StatusEnum, {
    message: 'status should be either of published or draft',
  })
  status: StatusEnum;

  @IsOptional()
  @IsString()
  image_url: string;
}
