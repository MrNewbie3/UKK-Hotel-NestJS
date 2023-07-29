import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipeKamarService } from './tipe_kamar.service';
import { CreateTipeKamarDto } from './dto/create-tipe_kamar.dto';
import { UpdateTipeKamarDto } from './dto/update-tipe_kamar.dto';

@Controller('types')
export class TipeKamarController {
  constructor(private readonly tipeKamarService: TipeKamarService) {}

  @Post()
  create(@Body() createTipeKamarDto: CreateTipeKamarDto) {
    return this.tipeKamarService.create(createTipeKamarDto);
  }

  @Get()
  findAll() {
    return this.tipeKamarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipeKamarService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipeKamarDto: UpdateTipeKamarDto,
  ) {
    return this.tipeKamarService.update(+id, updateTipeKamarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipeKamarService.remove(+id);
  }
}
