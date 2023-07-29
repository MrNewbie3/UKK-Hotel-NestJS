import { Injectable } from '@nestjs/common';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    updateTransaksiDto: UpdateTransaksiDto,
  ): Promise<any> {
    try {
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

  async removeTransaction(transactionId: any): Promise<any> {
    try {
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
