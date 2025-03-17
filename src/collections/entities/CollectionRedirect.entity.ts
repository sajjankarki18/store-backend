import { CollectionRedirectTypeEnum } from 'src/enums/collectionRedirectType.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CollectionRedirect {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  collection_id: string;

  @Column({ nullable: true })
  redirect_id: string;

  @Column({ nullable: true })
  redirect_type: CollectionRedirectTypeEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
