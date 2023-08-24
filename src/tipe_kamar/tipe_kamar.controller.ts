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
  findAll(@Res() response: Response) {
    return this.tipeKamarService.findAll(response);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response) {
    return this.tipeKamarService.findOne(id, response);
  }

  @Patch(':id')
  update(
    @Body() updateTipeKamarDto: UpdateTipeKamarDto,
    @Param('id') id: number,
    @Res() response: Response,
    @UploadedFile() foto: Buffer,
  ) {
    return this.tipeKamarService.update(id, updateTipeKamarDto, response, foto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() response: Response) {
    return this.tipeKamarService.remove(id, response);
  }
}
