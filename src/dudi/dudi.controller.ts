import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DudiService } from './dudi.service';
import { CreateDudiDto } from './dto/create-dudi.dto';
import { UpdateDudiDto } from './dto/update-dudi.dto';

@Controller('dudi')
export class DudiController {
  constructor(private readonly dudiService: DudiService) {}

  @Post()
  create(@Body() createDudiDto: CreateDudiDto) {
    return this.dudiService.create(createDudiDto);
  }

  @Get()
  findAll() {
    return this.dudiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dudiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDudiDto: UpdateDudiDto) {
    return this.dudiService.update(+id, updateDudiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dudiService.remove(+id);
  }
}
