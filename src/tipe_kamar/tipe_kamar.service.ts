import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipeKamarService {
  constructor(private prismaService: PrismaService) {}
  async create(createTipeKamarDto): Promise<any> {
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.create({
        data: createTipeKamarDto,
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.findMany();
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTipeKamarDto, res: Response): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const RoomTypes = await this.prismaService.tipe_Kamar.update({
        where: {
          id: Number(id),
        },
        data: updateTipeKamarDto,
      });
      return RoomTypes;
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
      if (isRoomExist.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const RoomTypes = await this.prismaService.tipe_Kamar.delete({
        where: {
          id: Number(id),
        },
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }
}
