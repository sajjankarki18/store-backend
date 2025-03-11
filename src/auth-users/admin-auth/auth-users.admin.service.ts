import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from './entities/auth-user.entity';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRole } from './entities/auth-userRole.entity';
import { AuthUserRoleRepository } from './repositories/auth-userRole.repository';
import { AuthUserRoleType } from './entities/auth-userRoleType.entity';
import { AuthUserRoleTypeRepository } from './repositories/auth-userRoleType.repository';
import { AuthUserRoleTypeEnum } from 'src/enums/authUserRoleType.enum';
import { UpdateUserRoleDto } from './dto/create-userRole.dto';

@Injectable()
export class AuthUserAdminService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: AuthUserRepository,
    @InjectRepository(AuthUserRole)
    private readonly authUserRoleRepository: AuthUserRoleRepository,
    @InjectRepository(AuthUserRoleType)
    private readonly authUserRoleTypeRepository: AuthUserRoleTypeRepository,
    private readonly jwtService: JwtService,
  ) {}

  /* admin panel authentication */

  /* validate email */
  validateEmail = async (userDto: SignUpUserDto): Promise<void> => {
    const email = await this.authUserRepository.findOne({
      where: {
        email: userDto.email,
      },
    });

    if (email) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['User with this email already exists'],
        error: 'Conflict',
      });
    }
  };

  validateUser = async (userId: string): Promise<void> => {
    const user = await this.authUserRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user not found'],
        error: 'Not Found',
      });
    }
  };

  /* sigup user*/
  async signup(signupUserDto: SignUpUserDto): Promise<AuthUser> {
    await this.validateEmail(signupUserDto);
    try {
      const hashedPassword = await argon.hash(
        signupUserDto.password,
      ); /* use argon to hash the password */

      const user = this.authUserRepository.create({
        email: signupUserDto.email,
        username: signupUserDto.username,
        password: hashedPassword,
        phone: signupUserDto.phone,
        country: signupUserDto.country,
        is_active: signupUserDto.is_active,
      });

      return await this.authUserRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['Some error occured while creating the account', error],
        error: 'Internal Server Error',
      });
    }
  }

  /* signin user */
  async signin(
    signinUserDto: SigninUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authUserRepository.findOne({
      where: {
        email: signinUserDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['Invalid email or password!'],
        error: 'Not Found',
      });
    }

    /* verify the password using argon verify */
    const passVerify = await argon.verify(
      user.password,
      signinUserDto.password,
    );

    if (!passVerify) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['Incorrect password, please try again!'],
        error: 'Unauthorized',
      });
    }

    return await this.signToken(user.id, user.email);
  }

  /* generate an access_token when an user signs in */
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.SECRET,
    });

    return {
      access_token: access_token,
    };
  }

  /* pagination feature to display all users */
  async getAllUsers({ page, limit }: { page: number; limit: number }): Promise<{
    data: AuthUser[];
    page: number;
    limit: number;
    total: number;
  }> {
    if (isNaN(Number(page)) || isNaN(Number(limit)) || page < 0 || limit < 0) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['page and limit must be of positive integers'],
        error: 'Conflict',
      });
    }
    const new_limit: number = limit > 10 ? 20 : limit;

    const [users, totalUsers] = await this.authUserRepository.findAndCount({
      skip: (page - 1) * new_limit,
      take: new_limit,
      order: { created_at: 'desc' },
    });

    return {
      data: users,
      page,
      limit: new_limit,
      total: totalUsers,
    };
  }

  async getUserById(id: string): Promise<AuthUser> {
    const user = await this.authUserRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'email', 'username', 'is_active', 'country', 'phone'],
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['User not found'],
        error: 'Not Found',
      });
    }

    delete user.password;
    return user;
  }

  async showUserData(
    req: any,
  ): Promise<{ user: AuthUser; user_roles: AuthUserRole }> {
    const user = await this.authUserRepository.findOne({
      where: {
        id: req.user.sub,
      },
      select: ['id', 'email', 'username', 'is_active', 'country'],
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['User not found'],
        error: 'Not Found',
      });
    }

    const user_role = await this.authUserRoleRepository.findOne({
      where: {
        id: user.role_id,
      },
      select: ['id', 'title'],
    });

    if (!user_role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user role not found'],
        error: 'Not Found',
      });
    }

    const user_role_types = await this.authUserRoleTypeRepository.find({
      where: {
        role_id: user_role.id,
      },
    });

    const user_roles = {
      ...user_role,
      role_types: user_role_types.map((role) => ({
        id: role.id,
        role_name: role.role_name,
        permission_type: role.permission_type,
      })),
    };
    return {
      user,
      user_roles,
    };
  }

  /* creation of user roles */
  async createUserRoles(userId: string) {
    try {
      const userRole = this.authUserRoleRepository.create({});
      const savedUserRole = await this.authUserRoleRepository.save(userRole);

      const role_names = ['banners', 'categories', 'products'];

      const role_types = await Promise.all(
        role_names.map(async (name) => {
          return this.authUserRoleTypeRepository.create({
            role_name: name,
            permission_type: AuthUserRoleTypeEnum.None,
            role_id: savedUserRole.id,
          });
        }),
      );

      await this.validateUser(
        userId,
      ); /* validate the userId weather it exists in the users table */
      await this.authUserRepository.update(userId, { role_id: userRole.id });

      return await this.authUserRoleTypeRepository.save(role_types);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the role', error.message],
        error: 'Internal Server',
      });
    }
  }

  async updateUserRole(id: string, userRoleDto: UpdateUserRoleDto) {
    const user_role = await this.authUserRoleRepository.findOne({
      where: {
        id,
      },
    });

    if (!user_role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user role not found'],
        error: 'Not Found',
      });
    }

    if (userRoleDto.title) {
      await this.authUserRoleRepository.update(
        { id },
        {
          title: userRoleDto.title,
        },
      );
    }

    if (userRoleDto.permission_type) {
      const user_role_type = await this.authUserRoleTypeRepository.find({
        where: {
          role_id: id,
        },
      });

      if (user_role_type.length > 0) {
        await Promise.all(
          user_role_type.map(async (role_type) => {
            role_type.permission_type = userRoleDto.permission_type;
            await this.authUserRoleTypeRepository.save(role_type);
          }),
        );
      }
    }

    return user_role;
  }

  async deleteUserRole(id: string): Promise<{ id: string; message: string }> {
    const user = await this.authUserRepository.findOne({
      where: {
        role_id: id,
      },
    });

    const user_role = await this.authUserRoleRepository.findOne({
      where: {
        id,
      },
    });

    if (!user_role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user role not found'],
        error: 'Not Found',
      });
    }

    const deletedUserRole = await this.authUserRoleRepository.delete(id);

    if (deletedUserRole) {
      await this.authUserRoleTypeRepository.delete({ role_id: id });
      await this.authUserRepository.update(user.id, { role_id: null });
    }

    return {
      id: `${id}`,
      message: 'user role has been removed',
    };
  }

  /* Front-end customers authentication */
}
