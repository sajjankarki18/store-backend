import { Customer } from '../../customers/entities/customer.entity';
import { CustomerRepository } from '../../customers/repositories/customer.repository';
import { CreateUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthUserService {
    private readonly customersRepository;
    private readonly jwtService;
    constructor(customersRepository: CustomerRepository, jwtService: JwtService);
    signup(createUserDto: CreateUserDto): Promise<Customer>;
    loginUserDto(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    signToken: (userId: string, email: string) => Promise<{
        access_token: string;
    }>;
}
