import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { StatusEnum } from 'src/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, default: RedirectTypeEnum.None })
  redirect_type: RedirectTypeEnum;

  @Column({ nullable: true })
  redirect_id: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: StatusEnum.Draft })
  status: StatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
