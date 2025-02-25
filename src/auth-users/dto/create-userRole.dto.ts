import {  IsEnum, IsOptional, IsString } from 'class-validator';
import { AuthUserRoleTypeEnum } from '../../enums/authUserRoleType.enum';

export class UpdateUserRoleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(AuthUserRoleTypeEnum)
  @IsOptional()
  permission_type?: AuthUserRoleTypeEnum;
}
