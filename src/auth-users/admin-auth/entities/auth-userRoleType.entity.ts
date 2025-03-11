import { AuthUserRoleTypeEnum } from 'src/enums/authUserRoleType.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUserRole } from './auth-userRole.entity';

@Entity()
export class AuthUserRoleType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  role_name: string;

  @Column({ nullable: true, default: AuthUserRoleTypeEnum.None })
  permission_type: AuthUserRoleTypeEnum;

  /* user role types may associate with single user role */
  @ManyToOne(
    () => AuthUserRole,
    (auth_user_role) => auth_user_role.user_role_type,
  )
  @JoinColumn({ name: 'role_id' })
  user_role: AuthUserRole;

  @Column({ nullable: true })
  role_id: string;
}
