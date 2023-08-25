import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateKamarDto } from './dto/update-kamar.dto';
import { HelperService } from 'src/helper/helper.service';
import { CreateKamarDto } from './dto/create-kamar.dto';

@Injectable()
export class KamarService {
  constructor(
    private prismaService: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async create(
    createKamarDto: CreateKamarDto,
    response: Response,
  ): Promise<any> {
    try {
      const room = await this.prismaService.kamar.create({
        data: createKamarDto,
      });
      return this.helper.createdWrapper(response, room);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findAll(response: Response): Promise<Response<any>> {
    try {
      const room = await this.prismaService.kamar.findMany();
      return this.helper.successWrapper(response, room);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findOne(id: number, response: Response): Promise<any> {
    try {
      const room = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      return this.helper.successWrapper(response, room);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateKamarDto: UpdateKamarDto,
    response: Response,
  ): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length === 0) {
        return this.helper.notFoundWrapper(response, { id });
      }
      const room = await this.prismaService.kamar.update({
        where: {
          id: Number(id),
        },
        data: updateKamarDto,
      });
      return this.helper.successWrapper(response, room);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async remove(id: number, response: Response): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length === 0) {
        return this.helper.notFoundWrapper(response, { id });
      }
      const room = await this.prismaService.kamar.delete({
        where: {
          id: Number(id),
        },
      });
      return this.helper.successWrapper(response, room);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
}
