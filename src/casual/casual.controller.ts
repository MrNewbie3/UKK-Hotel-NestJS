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
import { CasualService } from './casual.service';
import { CreateCasualDto } from './dto/create-casual.dto';
import { UpdateCasualDto } from './dto/update-casual.dto';
import { Response } from 'express';

@Controller('casual')
export class CasualController {
  constructor(private readonly casualService: CasualService) {}

  @Post()
  create(@Body() createCasualDto: CreateCasualDto, @Res() response: Response) {
    return this.casualService.create(createCasualDto, response);
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.casualService.findAll(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    return this.casualService.findOne(+id, response);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCasualDto: UpdateCasualDto,
    @Res() response: Response,
  ) {
    return this.casualService.update(+id, updateCasualDto, response);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    return this.casualService.remove(+id, response);
  }
}
