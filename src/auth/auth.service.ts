import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { dirname } from 'path';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signIn(createAuthDto: CreateAuthDto, response: Response): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        nama: createAuthDto.nama,
      },
    });

    if (user === null) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({ msg: 'User not found' });
    }
    const hash = await argon2.verify(user.password, createAuthDto.password);
    if (!hash) {
      const error = new BadRequestException();
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(error + (error.message = 'Invalid password'));
    }
    const privateKey = fs.readFileSync(
      dirname(require.main.path) + '/private.pem',
      'utf-8',
    );

    const payload = { sub: user.id, username: user.nama, role: user.role };
    return response.status(HttpStatus.OK).send({
      access_token: await this.jwtService.signAsync(payload, {
        algorithm: 'RS512',
        secret: privateKey,
      }),
      msg: 'Login success',
    });
  }

  async getUserAuth(request: Request, response: Response) {
    const { username } = request['user'];

    const user = await this.prismaService.user.findUnique({
      where: {
        nama: username,
      },
    });
    if (!user) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(new InternalServerErrorException());
    }
    delete user.password;
    return response.status(HttpStatus.OK).send(user);
  }
}
