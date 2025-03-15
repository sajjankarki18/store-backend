import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  image_url: string;

  @Column('decimal', { nullable: true })
  ratings: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
