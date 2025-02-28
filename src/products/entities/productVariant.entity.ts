import {
  ProductVariantColorsEnum,
  ProductVariantsSizeEnum,
} from 'src/enums/variants.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true, default: ProductVariantColorsEnum.None })
  color: ProductVariantColorsEnum;

  @Column({ nullable: true, default: ProductVariantsSizeEnum.None })
  size: ProductVariantsSizeEnum;

  @Column({ nullable: true, default: false })
  in_stock: true;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
