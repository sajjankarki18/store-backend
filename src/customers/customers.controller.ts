import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { AddReviewDto } from './dto/add-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('/customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Fetch all reviews!' })
  @ApiResponse({ status: 201, description: 'Reviews cannot be fetched!' })
  @ApiResponse({ status: 400, description: 'Invalid review' })
  @Get('/all-reviews')
  getAllCustomerReviews() {
    return this.customerService.getAllCustomerReviews();
  }

  @ApiOperation({ summary: ' Add a review!' })
  @ApiResponse({
    status: 201,
    description: 'Review has been added sucessfully!',
  })
  @ApiResponse({ status: 400, description: 'Invalid review' })
  @Post('/review')
  addReview(@Req() req: any, @Body() addReview: AddReviewDto) {
    return this.customerService.addReview(req, addReview);
  }

  @Put('/:id')
  updateReview(@Param('id') id: string, @Body() editReview: EditReviewDto) {
    return this.customerService.updateReview(id, editReview);
  }

  @Delete('/:id')
  deleteReview(@Param('id') id: string) {
    return this.customerService.deleteReview(id);
  }
}
