import { Controller } from '@nestjs/common';
import { CustomerService } from './customers.service';

@Controller()
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}
}
