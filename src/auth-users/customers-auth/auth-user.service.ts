import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { CustomerRepository } from '../../customers/repositories/customer.repository';
import { CreateUserDto } from './dto/signup-user.dto';
import * as argon from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: CustomerRepository,
    private readonly jwtService: JwtService,
  ) {}

  /* create a new account */
  async signup(createUserDto: CreateUserDto): Promise<Customer> {
    /* validate email before creating a new account */
    const email = await this.customersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (email) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['Email already in use!'],
        error: 'Conflct',
      });
    }

    try {
      const hashedPass = await argon.hash(createUserDto.password);
      const user = this.customersRepository.create({
        email: createUserDto.email,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        password: hashedPass,
        phone_number: createUserDto.phone,
        country: createUserDto.country,
      });

      return await this.customersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['Something went wrong, please try again!', error],
        error: 'Internal Server Error',
      });
    }
  }

  /* login into account */
  async loginUserDto(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.customersRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [
          'email not found, Create a new account if you dont have one!',
        ],
        error: 'Not Found',
      });
    }

    const verifyPass = await argon.verify(user.password, loginUserDto.password);
    if (!verifyPass) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['Incorrect password, please try again!'],
        error: 'Not Found',
      });
    }

    return this.signToken(user.id, user.email);
  }

  /* JWT token */
  signToken = async (
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> => {
    const jwtSECRET = process.env.SECRET;
    if (!jwtSECRET) {
      throw new Error('JWT secret is not defined');
    }

    const payload = {
      sub: userId,
      email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1hr',
      secret: process.env.SECRET,
    });

    return {
      access_token: access_token,
    };
  };
}
