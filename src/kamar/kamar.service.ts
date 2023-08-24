import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateKamarDto } from './dto/update-kamar.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class KamarService {
  constructor(
    private prismaService: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async create(createKamarDto: any): Promise<any> {
    try {
      const room = await this.prismaService.kamar.create({
        data: createKamarDto,
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(response: Response): Promise<Response<any>> {
    try {
      const room = await this.prismaService.kamar.findMany();
      return this.helper.successWrapper(response, room);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const room = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateKamarDto: UpdateKamarDto,
    res: Response,
  ): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const room = await this.prismaService.kamar.update({
        where: {
          id: Number(id),
        },
        data: updateKamarDto,
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number, res: Response): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const room = await this.prismaService.kamar.delete({
        where: {
          id: Number(id),
        },
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }
}
