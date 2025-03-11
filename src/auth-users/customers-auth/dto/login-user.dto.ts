import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'email of the user',
    example: 'monkeyDLuffy@gmail.com',
    type: String,
  })
  @IsNotEmpty({ message: 'email field is empty!' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the email',
    example: 'abc12345',
    type: String,
  })
  @IsNotEmpty({ message: 'password field is empty!' })
  @IsString()
  password: string;
}
