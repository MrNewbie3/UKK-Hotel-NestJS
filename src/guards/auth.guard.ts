import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { dirname } from 'path';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private helper: HelperService) {}
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
    if (request['cookies'].token) {
      const { token } = request['cookies'];
      return token;
    }

    if (!request.headers.authorization || !request['cookies']) {
      return this.helper.unauthorizedHelper(response);
    }

    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
