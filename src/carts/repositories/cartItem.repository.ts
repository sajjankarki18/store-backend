import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';

@Injectable()
export class CartItemRepository extends Repository<CartItem> {
  constructor(dataSource: DataSource) {
    super(CartItem, dataSource.createEntityManager());
  }
}
