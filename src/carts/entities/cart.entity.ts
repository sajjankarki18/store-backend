import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  user_id: string;

  @Column('decimal', { nullable: true })
  total_price: number;

  @Column({ default: false })
  cart_status: boolean;
}
