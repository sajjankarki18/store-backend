import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email of the user',
    example: 'monkeyDLuffy@gmail.com',
    type: String,
  })
  @IsNotEmpty({ message: 'email field is empty!' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'first name of the user',
    example: 'Roronoa',
    type: String,
  })
  @IsNotEmpty({ message: 'first name required!' })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'last name of the user',
    example: 'Zoro',
    type: String,
  })
  @IsNotEmpty({ message: 'last name required!' })
  @IsString()
  last_name: string;

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
}
