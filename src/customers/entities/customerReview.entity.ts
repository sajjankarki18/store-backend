import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  review: string;

  @Column('decimal', { nullable: true })
  ratings: number;
}
