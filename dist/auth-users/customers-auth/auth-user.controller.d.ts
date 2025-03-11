import { AuthUserService } from './auth-user.service';
import { CreateUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    signup(createUserDto: CreateUserDto): Promise<import("../../customers/entities/customer.entity").Customer>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
