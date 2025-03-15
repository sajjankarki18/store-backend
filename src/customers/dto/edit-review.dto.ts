import { PartialType } from '@nestjs/swagger';
import { AddReviewDto } from './add-review.dto';

export class EditReviewDto extends PartialType(AddReviewDto) {
  readonly id: string;
}
