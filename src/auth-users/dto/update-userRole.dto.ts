import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  @IsOptional()
  title: string;
}
