import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { Response } from 'express';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Post()
  create(
    @Body() createTransaksiDto: CreateTransaksiDto,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.createTransaction(
      createTransaksiDto,
      response,
    );
  }

  @Get()
  findAll(@Res() response: Response): Promise<Response<any>> {
    return this.transaksiService.findAllTransaction(response);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.findOneTransaction(id, response);
  }

  @Patch(':id')
  update(
    @Body() updateTransaksiDto: UpdateTransaksiDto,
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.updateTransaction(
      id,
      response,
      updateTransaksiDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.removeTransaction(id, response);
  }
}
