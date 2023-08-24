import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { dirname } from 'path';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request, response);
    const privateKey = fs.readFileSync(
      dirname(require.main.path) + '/private.pem',
      'utf8',
    );

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: privateKey,
      });
      return (request['user'] = payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(
    request: Request,
    response: Response,
  ): string | undefined | any {
    if (!request.headers.authorization) {
      const unauthhorized = new UnauthorizedException();
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send({ ...unauthhorized, message: 'You need to login' });
    }
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
