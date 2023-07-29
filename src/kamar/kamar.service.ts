import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KamarService {
  constructor(private prismaService: PrismaService) {}
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

  async findAll(): Promise<any[]> {
    try {
      const room = await this.prismaService.kamar.findMany();
      return room;
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

  async update(id: number, updateKamarDto: any): Promise<any> {
    try {
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

  async remove(id: number): Promise<any> {
    try {
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
