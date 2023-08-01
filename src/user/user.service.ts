import {
  Body,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(): Promise<any[]> {
    try {
      const user = await this.prisma.user.findMany();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: createUserDto,
  ): Promise<any> {
    try {
      const isUserExist = await this.prisma.user.findUnique({
        where: {
          nama: payload.nama,
        },
      });
      if (isUserExist) {
        return res.status(HttpStatus.CONFLICT).send(new ConflictException());
      }

      const { email, foto, nama, role } = payload;
      const password = await bcrypt.hash(payload.password, 20);
      const user = await this.prisma.user.create({
        data: {
          nama,
          email,
          role,
          password,
          foto,
        },
      });
      return res.status(HttpStatus.CREATED).send(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSingleUser(@Param('id') userId: any): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: parseInt(userId),
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(
    @Param() userId: any,
    @Res() response: Response,
    @Body() payload: updateUserDto,
  ): Promise<any> {
    try {
      const findUser = await this.prisma.user.findMany({
        where: {
          id: Number(userId),
        },
      });
      if (findUser.length < 1) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(new NotFoundException());
      }
      const validation = await this.prisma.user.findUnique({
        where: { nama: payload.nama },
      });
      if (validation) {
        return response
          .status(HttpStatus.CONFLICT)
          .send(new ConflictException());
      }
      const user = await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: payload,
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(
    @Res() res: Response,
    @Param('id') userId: any,
  ): Promise<any> {
    try {
      const getUser = await this.prisma.user.findMany({
        where: {
          id: Number(userId),
        },
      });
      if (getUser.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const user = await this.prisma.user.delete({
        where: {
          id: Number(userId),
        },
      });
      delete user.password;
      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(payload: updateUserDto, res: Response): Promise<any> {
    try {
      const validation = await this.prisma.user.findMany({
        where: {
          nama: payload.nama,
        },
      });
      if (validation.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const user = await this.prisma.user.findFirst({
        where: { nama: payload.nama },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
