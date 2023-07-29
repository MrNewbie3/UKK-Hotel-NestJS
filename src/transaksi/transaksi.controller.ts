import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';

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
    @Body() updateTransaksiDto: UpdateTransaksiDto,
  ) {
    return this.transaksiService.updateTransaction(+id, updateTransaksiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaksiService.removeTransaction(+id);
  }
}
