import { DataSource, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
export declare class CartRepository extends Repository<Cart> {
    constructor(dataSource: DataSource);
}
