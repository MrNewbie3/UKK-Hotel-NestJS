import { Injectable } from '@nestjs/common';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { HelperService } from 'src/helper/helper.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class TransaksiService {
  constructor(
    private prismaService: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async findAllTransaction(response: Response): Promise<Response<any>> {
    try {
      const transaction = await this.prismaService.pemesanan.findMany({});
      return this.helper.successWrapper(response, transaction);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
  async createTransaction(
    createTransaksiDto: CreateTransaksiDto,
    response: Response,
  ): Promise<any> {
    try {
      const transaction = await this.prismaService.pemesanan.create({
        data: createTransaksiDto,
      });
      return this.helper.createdWrapper(response, transaction);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findOneTransaction(
    transactionId: any,
    response: Response,
  ): Promise<any> {
    try {
      const transaction = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(transactionId),
        },
      });
      return this.helper.successWrapper(response, transaction);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async updateTransaction(
    transactionId: any,
    response: Response,
    updateTransaksiDto: UpdateTransaksiDto,
  ): Promise<any> {
    try {
      const isTransactionExist = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(transactionId),
        },
      });
      if (isTransactionExist.length < 1) {
        return this.helper.notFoundWrapper(response, { transactionId });
      }
      const transaction = await this.prismaService.pemesanan.update({
        where: {
          id: Number(transactionId),
        },
        data: updateTransaksiDto,
      });
      return this.helper.successWrapper(response, transaction);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async removeTransaction(
    transactionId: any,
    response: Response,
  ): Promise<any> {
    try {
      const isExist = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(transactionId),
        },
      });
      if (isExist.length) {
        return this.helper.notFoundWrapper(response, { transactionId });
      }
      const transaction = await this.prismaService.pemesanan.delete({
        where: {
          id: Number(transactionId),
        },
      });
      return this.helper.successWrapper(response, transaction);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async filterTransaction(params: QueryDTO, response: Response) {
    try {
      const findByParams = await this.prismaService.pemesanan.findMany({
        where: params,
      });
      if (findByParams.length < 1) {
        return this.helper.notFoundWrapper(response, params);
      }
      return this.helper.successWrapper(response, findByParams);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
}

// : Promise<Response<any>>
