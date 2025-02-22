import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthUserService } from './auth-users.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('/admin/auth_user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('/signup')
  signup(@Body() signupUserDto: SignUpUserDto) {
    return this.authUserService.signup(signupUserDto);
  }

  @Post('/signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.authUserService.signin(signinUserDto);
  }

  /* show the logged in user details */
  @Get('/me')
  showUserData(@Req() req) {
    return this.authUserService.showUserData(req);
  }
}
