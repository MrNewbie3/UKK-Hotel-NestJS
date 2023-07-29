import { Injectable } from '@nestjs/common';
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

  async update(id: number, updateTipeKamarDto): Promise<any> {
    try {
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

  async remove(id: number): Promise<any> {
    try {
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
