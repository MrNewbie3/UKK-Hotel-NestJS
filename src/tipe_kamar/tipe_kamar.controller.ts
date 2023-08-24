import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { TipeKamarService } from './tipe_kamar.service';
import { CreateTipeKamarDto } from './dto/create-tipe_kamar.dto';
import { UpdateTipeKamarDto } from './dto/update-tipe_kamar.dto';
import { Response } from 'express';

@Controller('types')
export class TipeKamarController {
  constructor(private readonly tipeKamarService: TipeKamarService) {}

  @Post()
  create(
    @Body() createTipeKamarDto: CreateTipeKamarDto,
    @UploadedFile() foto: Buffer,
    @Res() response: Response,
  ) {
    return this.tipeKamarService.create(createTipeKamarDto, foto, response);
  }

  @Get()
  findAll() {
    return this.tipeKamarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipeKamarService.findOne(id);
  }

  @Patch(':id')
  update(
    @Body() updateTipeKamarDto: UpdateTipeKamarDto,
    @Param('id') id: number,
    @Res() res: Response,
    @UploadedFile() foto: Buffer,
  ) {
    return this.tipeKamarService.update(id, updateTipeKamarDto, res, foto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.tipeKamarService.remove(id, res);
  }
}
