import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  product_title: string;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  variant_id: string;

  @Column({ nullable: true })
  quantity: number;

  @Column('decimal', { nullable: true })
  price: number;

  @Column({ nullable: true })
  cart_id: string;
}
