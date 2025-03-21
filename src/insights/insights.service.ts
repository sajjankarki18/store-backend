import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { CartRepository } from 'src/carts/repositories/cart.repository';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { Customer } from 'src/customers/entities/customer.entity';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import { StatusEnum } from 'src/enums/status.enum';

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: CartRepository,
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(Customer)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async getInSightsData(): Promise<{
    data: any[];
  }> {
    const totalAddedCarts = await this.cartRepository.count();
    const totalProducts = await this.productRepository.count({
      where: { status: StatusEnum.Published },
    });
    const totalCustomers = await this.customerRepository.count();

    return {
      data: [{ totalAddedCarts, totalProducts, totalCustomers }],
    };
  }
}
