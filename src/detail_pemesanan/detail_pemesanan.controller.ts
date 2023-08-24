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
  create(
    @Body() createDetailPemesananDto: CreateDetailPemesananDto,
    @Res() response: Response,
  ) {
    return this.detailPemesananService.create(
      createDetailPemesananDto,
      response,
    );
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.detailPemesananService.findAll(response);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response) {
    return this.detailPemesananService.findOne(id, response);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDetailPemesananDto: UpdateDetailPemesananDto,
    @Res() response: Response,
  ) {
    return this.detailPemesananService.update(
      id,
      updateDetailPemesananDto,
      response,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() response: Response) {
    return this.detailPemesananService.remove(id, response);
  }
}
