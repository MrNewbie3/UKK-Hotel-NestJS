import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { dirname } from 'path';
import { HelperService } from 'src/helper/helper.service';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private helper: HelperService,
  ) {}
  async signIn(
    createAuthDto: CreateAuthDto,
    request: Request,
    response: Response,
  ): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });

    if (user === null) {
      return this.helper.notFoundWrapper(response, createAuthDto);
    }
    const hash = await argon2.verify(user.password, createAuthDto.password);
    if (!hash) {
      return this.helper.badRequestHelper(response, 'Invalid Password');
    }
    const privateKey = fs.readFileSync(
      dirname(require.main.path) + '/private.pem',
      'utf-8',
    );

    const payload = {
      sub: user.id,
      username: user.name,
      role: user.role,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS512',
      secret: privateKey,
    });
    response.cookie('token', accessToken);
    return this.helper.successWrapper(response, {
      ...payload,
      accessToken,
    });
  }

  async getUserAuth(request: Request, response: Response) {
    const { email } = request['user'];

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return this.helper.internalServerErrorWrapper(response, user);
    }
    delete user.password;
    return response.status(HttpStatus.OK).send(user);
  }
}
