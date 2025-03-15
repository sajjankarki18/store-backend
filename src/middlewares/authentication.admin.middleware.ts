import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationAdminMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['Please login to continue'],
        error: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: [`Session expired, please login to continue`, error.message],
        error: 'Unauthorized',
      });
    }
  }
}
