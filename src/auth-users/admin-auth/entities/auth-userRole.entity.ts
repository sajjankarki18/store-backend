import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthUserRoleType } from './auth-userRoleType.entity';
import { AuthUser } from './auth-user.entity';

@Entity()
export class AuthUserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  /* a user role may have multiple user role types */
  @OneToMany(
    () => AuthUserRoleType,
    (auth_user_role_type) => auth_user_role_type.user_role,
  )
  user_role_type: AuthUserRoleType[];

  @OneToMany(() => AuthUser, (auth_user) => auth_user.auth_user_role)
  auth_user: AuthUser[];
}
