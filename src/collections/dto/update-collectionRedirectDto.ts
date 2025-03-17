import { PartialType } from '@nestjs/swagger';
import { CreateCollectionRedirectDto } from './create-collectionRedirect.dto';

export class UpdateCollectionRedirectTypeDto extends PartialType(
  CreateCollectionRedirectDto,
) {
  readonly id: string;
}
