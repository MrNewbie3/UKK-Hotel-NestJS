import { Body, HttpCode, Injectable, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async postUser(@Req() req: Request, @Body() payload): Promise<any> {
    try {
      const isUserExist = await this.prisma.user.findUnique({
        where: {
          nama: payload.nama,
        },
      });
      if (isUserExist) {
        return 'User already exist';
      }
      const user = await this.prisma.user.create({ data: payload });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSingleUser(@Param('id') userId: any): Promise<any> {
    const { id } = userId;
    try {
      const user = await this.prisma.user.findMany({
        where: {
          id: parseInt(id),
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(@Param() userId: any, @Body() payload): Promise<any> {
    const { id } = userId;
    try {
      const user = await this.prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: payload,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(@Param() userId: any): Promise<any> {
    const { id } = userId;
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
