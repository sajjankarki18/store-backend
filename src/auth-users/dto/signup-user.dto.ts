import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({
    description: 'email of the user',
    example: 'monkeyDLuffy@gmail.com',
    type: String,
  })
  @IsNotEmpty({ message: 'email field is empty!' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'Monkey D Luffy',
    type: String,
  })
  @IsNotEmpty({ message: 'username field is empty!' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password of the email',
    example: 'abc12345',
    type: String,
  })
  @IsNotEmpty({ message: 'password field is empty!' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '9814426031',
    type: Number,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Country where user resides',
    example: 'Nepal',
    type: String,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'acrive status of the user',
    example: 'The status might be either of {true/false}',
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
