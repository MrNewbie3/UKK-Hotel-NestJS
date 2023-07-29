import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KamarService } from './kamar.service';
import { CreateKamarDto } from './dto/create-kamar.dto';
import { UpdateKamarDto } from './dto/update-kamar.dto';

@Controller('kamar')
export class KamarController {
  constructor(private readonly kamarService: KamarService) {}

  @Post()
  create(@Body() createKamarDto: CreateKamarDto) {
    return this.kamarService.create(createKamarDto);
  }

  @Get()
  findAll() {
    return this.kamarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kamarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKamarDto: UpdateKamarDto) {
    return this.kamarService.update(+id, updateKamarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kamarService.remove(+id);
  }
}
