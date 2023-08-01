import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDetailPemesananDto } from './dto/update-detail_pemesanan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class DetailPemesananService {
  constructor(private prismaService: PrismaService) {}
  async create(createDetailPemesananDto: any): Promise<any> {
    try {
      const details = await this.prismaService.detail_Pemesanan.create({
        data: createDetailPemesananDto,
      });
      return details;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const details = await this.prismaService.detail_Pemesanan.findMany();
      return details;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(detailId: any): Promise<any> {
    try {
      const details = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      return details;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    detailId: any,
    updateDetailPemesananDto: UpdateDetailPemesananDto,
    res: Response,
  ): Promise<any> {
    try {
      const isTransaction = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      if (isTransaction.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const detail = await this.prismaService.detail_Pemesanan.update({
        where: {
          id: Number(detailId),
        },
        data: updateDetailPemesananDto,
      });
      return detail;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(detailId: any, res: Response): Promise<any> {
    try {
      const isTransaction = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      if (isTransaction.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const detail = await this.prismaService.detail_Pemesanan.delete({
        where: {
          id: Number(detailId),
        },
      });
      return detail;
    } catch (error) {
      throw new Error(error);
    }
  }
}
