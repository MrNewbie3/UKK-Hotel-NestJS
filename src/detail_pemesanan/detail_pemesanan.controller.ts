import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailPemesananService } from './detail_pemesanan.service';
import { CreateDetailPemesananDto } from './dto/create-detail_pemesanan.dto';
import { UpdateDetailPemesananDto } from './dto/update-detail_pemesanan.dto';

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
  ) {
    return this.detailPemesananService.update(id, updateDetailPemesananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detailPemesananService.remove(id);
  }
}
