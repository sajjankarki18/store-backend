import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationCustomerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders?.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['Please login to continue...'],
        error: 'Unauthorized',
      });
    }

    const token = authHeaders.split(' ')[1];
    const decodedToken = await this.jwtService.verify(token, {
      secret: process.env.SECRET,
    });
    req.user = decodedToken;
    next();
    try {
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: [`Session expired, please login to continue`, error.message],
        error: 'Unauthorized',
      });
    }
  }
}
