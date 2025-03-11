import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './customers.controller';
import { CustomerService } from './customers.service';
import { CustomerReview } from './entities/customerReview.entity';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerReview])],
  controllers: [CustomersController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomersModule {}
