import { Injectable } from '@nestjs/common';
import { UpdateDetailPemesananDto } from './dto/update-detail_pemesanan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { HelperService } from 'src/helper/helper.service';
import { CreateDetailPemesananDto } from './dto/create-detail_pemesanan.dto';

@Injectable()
export class DetailPemesananService {
  constructor(
    private prismaService: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async create(
    createDetailPemesananDto: CreateDetailPemesananDto,
    response: Response,
  ): Promise<Response<any>> {
    try {
      const details = await this.prismaService.detail_Pemesanan.create({
        data: createDetailPemesananDto,
      });
      return this.helper.createdWrapper(response, details);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findAll(response: Response): Promise<Response<any[]>> {
    try {
      const details = await this.prismaService.detail_Pemesanan.findMany();
      return this.helper.successWrapper(response, details);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findOne(detailId: any, response: Response): Promise<any> {
    try {
      const details = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      return this.helper.successWrapper(response, details);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async update(
    detailId: any,
    updateDetailPemesananDto: UpdateDetailPemesananDto,
    response: Response,
  ): Promise<any> {
    try {
      const isTransaction = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      if (isTransaction.length < 1) {
        return this.helper.notFoundWrapper(response, { detailId });
      }
      const detail = await this.prismaService.detail_Pemesanan.update({
        where: {
          id: Number(detailId),
        },
        data: updateDetailPemesananDto,
      });
      return this.helper.successWrapper(response, detail);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async remove(detailId: any, response: Response): Promise<any> {
    try {
      const isTransaction = await this.prismaService.detail_Pemesanan.findMany({
        where: {
          id: Number(detailId),
        },
      });
      if (isTransaction.length < 1) {
        return this.helper.conflictWrapper(response, { detailId });
      }
      const detail = await this.prismaService.detail_Pemesanan.delete({
        where: {
          id: Number(detailId),
        },
      });
      return this.helper.successWrapper(response, detail);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
}
