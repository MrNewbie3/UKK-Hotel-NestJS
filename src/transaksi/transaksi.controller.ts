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
  create(@Body() createTransaksiDto: CreateTransaksiDto) {
    return this.transaksiService.createTransaction(createTransaksiDto);
  }

  @Get()
  findAll() {
    return this.transaksiService.findAllTransaction();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transaksiService.findOneTransaction(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateTransaksiDto: UpdateTransaksiDto,
  ) {
    return this.transaksiService.updateTransaction(id, res, updateTransaksiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.transaksiService.removeTransaction(id, res);
  }
}
