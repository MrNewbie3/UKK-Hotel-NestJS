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
import { DetailPemesananService } from './detail_pemesanan.service';
import { CreateDetailPemesananDto } from './dto/create-detail_pemesanan.dto';
import { UpdateDetailPemesananDto } from './dto/update-detail_pemesanan.dto';
import { Response } from 'express';

@Controller('detail-pemesanan')
export class DetailPemesananController {
  constructor(
    private readonly detailPemesananService: DetailPemesananService,
  ) {}

  @Post()
  create(@Body() createDetailPemesananDto: CreateDetailPemesananDto) {
    return this.detailPemesananService.create(createDetailPemesananDto);
  }

  @Get()
  findAll() {
    return this.detailPemesananService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detailPemesananService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDetailPemesananDto: UpdateDetailPemesananDto,
    @Res() res: Response,
  ) {
    return this.detailPemesananService.update(
      id,
      updateDetailPemesananDto,
      res,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.detailPemesananService.remove(id, res);
  }
}
