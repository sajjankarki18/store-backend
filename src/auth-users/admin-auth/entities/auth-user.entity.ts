import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthUserRole } from './auth-userRole.entity';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => AuthUserRole, (auth_user_role) => auth_user_role.auth_user)
  @JoinColumn({ name: 'role_id' })
  auth_user_role: AuthUserRole;

  @Column({ nullable: true })
  role_id: string;
}
