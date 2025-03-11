import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/auth_user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authUserService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authUserService.loginUserDto(loginUserDto);
  }
}
