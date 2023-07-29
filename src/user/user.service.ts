import { Body, HttpCode, Injectable, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

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
    @Body() payload: createUserDto,
  ): Promise<any> {
    try {
      const isUserExist = await this.prisma.user.findUnique({
        where: {
          nama: payload.nama,
        },
      });
      if (isUserExist) {
        return 'User already exist';
      }
      const { email, foto, nama, password, role } = payload;
      const user = await this.prisma.user.create({
        data: {
          nama,
          email,
          role,
          password,
          foto,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSingleUser(@Param('id') userId: any): Promise<any> {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          id: parseInt(userId),
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(
    @Param() userId: any,
    @Body() payload: updateUserDto,
  ): Promise<any> {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: payload,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(@Param() userId: any): Promise<any> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
