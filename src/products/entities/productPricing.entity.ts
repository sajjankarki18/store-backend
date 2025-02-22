import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurrencyEnum } from '../../enums/currency.enum';

@Entity()
export class ProductPricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  variant_id: string;

  @Column({ nullable: true })
  country_code: string;

  @Column({ nullable: true, default: CurrencyEnum.USD })
  currency: CurrencyEnum;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  selling_price: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  crossed_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
