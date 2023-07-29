import { Injectable } from '@nestjs/common';
import { UpdateDetailPemesananDto } from './dto/update-detail_pemesanan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const { id } = detailId;
    try {
      const details = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(id),
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
  ): Promise<any> {
    const { id } = detailId;
    try {
      const detail = await this.prismaService.pemesanan.update({
        where: {
          id: Number(id),
        },
        data: updateDetailPemesananDto,
      });
      return detail;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(detailId: any): Promise<any> {
    const { id } = detailId;
    try {
      const detail = await this.prismaService.detail_Pemesanan.delete({
        where: {
          id: Number(id),
        },
      });
      return detail;
    } catch (error) {
      throw new Error(error);
    }
  }
}
