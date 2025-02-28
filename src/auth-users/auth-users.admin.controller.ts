import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AuthUserService } from './auth-users.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/update-userRole.dto';

@ApiTags('Admin Users')
@Controller('/admin/auth_user')
export class AuthUserAdminController {
  constructor(private readonly authUserService: AuthUserService) {}

  @ApiOperation({ summary: 'Create a new Account' })
  @ApiResponse({ status: 201, description: 'Account created sucessfully' })
  @ApiResponse({ status: 400, description: 'Failed to create account' })
  @Post('/signup')
  signup(@Body() signupUserDto: SignUpUserDto) {
    return this.authUserService.signup(signupUserDto);
  }

  @ApiOperation({ summary: 'Login Account' })
  @ApiResponse({ status: 201, description: 'logged in sucessfully' })
  @ApiResponse({
    status: 400,
    description: 'Failed to log in, please try again',
  })
  @Post('/signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.authUserService.signin(signinUserDto);
  }

  /* show the logged in user details */
  @Get('/me')
  showUserData(@Req() req) {
    return this.authUserService.showUserData(req);
  }

  @Get('/all-users')
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.authUserService.getAllUsers({ page, limit });
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.authUserService.getUserById(id);
  }

  @Post('/:userId/user-role')
  createUserRoles(@Param('userId') userId: string) {
    return this.authUserService.createUserRoles(userId);
  }

  @Put('/user-role/:id')
  updateUserRole(
    @Param('id') id: string,
    @Body() userRoleDto: UpdateUserRoleDto,
  ) {
    return this.authUserService.updateUserRole(id, userRoleDto);
  }

  @Delete('/user-role/:id')
  deleteUserRole(@Param('id') id: string) {
    return this.authUserService.deleteUserRole(id);
  }
}
