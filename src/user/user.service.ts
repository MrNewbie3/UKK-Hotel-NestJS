import {
  Body,
  Injectable,
  Param,
  Req,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { ImageKitService } from 'src/service/imagekit_service';
import { HelperService } from 'src/helper/helper.service';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly imageUpload: ImageKitService,
    private readonly helper: HelperService,
  ) {}
  async getUser(response: Response): Promise<Response<any[]>> {
    try {
      const user = await this.prisma.user.findMany();
      return this.helper.successWrapper(response, user);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async postUser(
    @Req() req: Request,
    @Res() response: Response,
    @Body() payload: CreateUserDto,
    @UploadedFile() foto: Buffer,
  ): Promise<any> {
    try {
      const isUserExist = await this.prisma.user.findUnique({
        where: {
          nama: payload.nama,
        },
      });

      if (isUserExist) {
        delete isUserExist.password;
        return this.helper.conflictWrapper(response, isUserExist);
      }
      let uploadedImage = 'undefined';
      if (foto && !isUserExist) {
        const upload = await this.imageUpload.uploadFiles(
          foto,
          new Date() + '_' + payload.nama + '_photo.jpg',
        );
        if (!upload) {
          return this.helper.internalServerErrorWrapper(response, upload);
        }
        uploadedImage = upload;
      }
      const { email, nama, role } = payload;

      const password = await argon2.hash(payload.password);

      const user = await this.prisma.user.create({
        data: {
          nama,
          email,
          role,
          password,
          foto: uploadedImage,
        },
      });
      delete user.password;
      return this.helper.createdWrapper(response, user);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
  async getSingleUser(
    @Param('id') userId: any,
    response: Response,
  ): Promise<Response<any>> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: parseInt(userId),
        },
      });
      delete user.password;
      return this.helper.successWrapper(response, user);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
  async updateUser(
    @Param() userId: any,
    @Res() response: Response,
    @Body() payload: UpdateUserDto,
    @UploadedFile() foto: Buffer,
  ): Promise<Response<any>> {
    let data = payload;

    try {
      const findUser = await this.prisma.user.findMany({
        where: {
          id: Number(userId),
        },
      });
      if (findUser.length < 1) {
        return this.helper.notFoundWrapper(response, data);
      }
      const validation = await this.prisma.user.findUnique({
        where: { nama: payload.nama },
      });
      if (validation && findUser[0].id != userId) {
        return this.helper.conflictWrapper(response, data.nama);
      }
      if (foto) {
        const upload = await this.imageUpload.uploadFiles(
          foto,
          new Date() + '_' + payload.nama + '_photo.jpg',
        );
        if (!upload) {
          return this.helper.internalServerErrorWrapper(response, upload);
        }
        data = { ...payload, foto: upload };
      }
      const user = await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: data,
      });
      delete user.password;
      return this.helper.successWrapper(response, user);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
  async deleteUser(
    @Res() response: Response,
    @Param('id') userId: any,
  ): Promise<Response<any>> {
    try {
      const getUser = await this.prisma.user.findMany({
        where: {
          id: Number(userId),
        },
      });
      if (getUser.length < 1) {
        return this.helper.notFoundWrapper(response, { userId });
      }
      const user = await this.prisma.user.delete({
        where: {
          id: Number(userId),
        },
      });
      delete user.password;
      return this.helper.successWrapper(response, user);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
}
