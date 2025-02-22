import { AuthUser } from './entities/auth-user.entity';
import { AuthUserRepository } from './repositories/auth-user.repository';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthUserService {
    private readonly authUserRepository;
    private readonly jwtService;
    constructor(authUserRepository: AuthUserRepository, jwtService: JwtService);
    validateEmail: (userDto: SignUpUserDto) => Promise<void>;
    signup(signupUserDto: SignUpUserDto): Promise<AuthUser>;
    signin(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
    showUserData(req: any): Promise<any>;
}
