import { DataSource, Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';
export declare class CartItemRepository extends Repository<CartItem> {
    constructor(dataSource: DataSource);
}
