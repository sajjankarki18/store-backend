import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { CollectionRedirectTypeEnum } from 'src/enums/collectionRedirectType.enum';

export class CreateCollectionRedirectDto {
  @IsOptional()
  @IsUUID()
  collection_id: string;

  @IsOptional()
  @IsUUID()
  redirect_id: string;

  @IsOptional()
  @IsEnum(CollectionRedirectTypeEnum, {
    message:
      'The collection redirect-type must be either of product or collection',
  })
  redirect_type: CollectionRedirectTypeEnum;
}
