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

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: AuthUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /* validate email */
  validateEmail = async (userDto: SignUpUserDto) => {
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

  async showUserData(req): Promise<any> {
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

    return user;
  }
}
