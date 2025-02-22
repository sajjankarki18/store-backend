import { AuthUserService } from './auth-users.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    signup(signupUserDto: SignUpUserDto): Promise<import("./entities/auth-user.entity").AuthUser>;
    signin(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    showUserData(req: any): Promise<any>;
}
