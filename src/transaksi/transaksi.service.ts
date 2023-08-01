import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class TransaksiService {
  constructor(private prismaService: PrismaService) {}
  async findAllTransaction(): Promise<any> {
    try {
      const transaction = await this.prismaService.pemesanan.findMany({});
      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createTransaction(createTransaksiDto: any): Promise<any> {
    try {
      const transaction = await this.prismaService.pemesanan.create({
        data: createTransaksiDto,
      });
      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneTransaction(transactionId: any): Promise<any> {
    try {
      const transaction = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(transactionId),
        },
      });
      return transaction;
    } catch (error) {
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
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(new NotFoundException());
      }
      const transaction = await this.prismaService.pemesanan.update({
        where: {
          id: Number(transactionId),
        },
        data: updateTransaksiDto,
      });
      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeTransaction(transactionId: any, res: Response): Promise<any> {
    try {
      const isExist = await this.prismaService.pemesanan.findMany({
        where: {
          id: Number(transactionId),
        },
      });
      if (isExist.length) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const transaction = await this.prismaService.pemesanan.delete({
        where: {
          id: Number(transactionId),
        },
      });
      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }
}
