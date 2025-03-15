import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerReview } from './entities/customerReview.entity';
import { CustomerRviewRepository } from './repositories/customerReview.repository';
import { AddReviewDto } from './dto/add-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: CustomerRepository,
    @InjectRepository(CustomerReview)
    private readonly customerReviewRepository: CustomerRviewRepository,
  ) {}

  /* fetch all customer reviews */
  async getAllCustomerReviews(): Promise<{ data: CustomerReview[] }> {
    const reviews = await this.customerReviewRepository.find();
    return { data: reviews };
  }

  /* add a review for companies product and services */
  async addReview(req: any, addReview: AddReviewDto): Promise<CustomerReview> {
    try {
      const customer = req.user.sub;
      console.log(customer);

      const customerReview = this.customerReviewRepository.create({
        customer_id: customer,
        review: addReview.review,
        ratings: addReview.ratings,
      });

      return await this.customerReviewRepository.save(customerReview);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['Some error has been occured, while adding review!', error],
        error: 'Internal Server Error',
      });
    }
  }

  async updateReview(
    id: string,
    editReview: EditReviewDto,
  ): Promise<CustomerReview> {
    const review = await this.customerReviewRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!review) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Review not found!'],
        error: 'Not Found',
      });
    }
    try {
      await this.customerReviewRepository.update(
        { id },
        {
          review: editReview.review,
          ratings: editReview.ratings,
        },
      );
      return await this.customerReviewRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured, while deleting review!', error],
        error: 'Internal Server Error',
      });
    }
  }

  async deleteReview(id: string): Promise<{ id: string; message: string }> {
    const review = await this.customerReviewRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!review) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Review not found!'],
        error: 'Not Found',
      });
    }
    try {
      await this.customerReviewRepository.delete(id);
      return { id: `${id}`, message: `review has been deleted!` };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured, while deleting review!', error],
        error: 'Internal Server Error',
      });
    }
  }
}
