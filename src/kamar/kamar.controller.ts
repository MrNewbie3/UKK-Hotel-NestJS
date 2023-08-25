import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { KamarService } from './kamar.service';
import { CreateKamarDto } from './dto/create-kamar.dto';
import { UpdateKamarDto } from './dto/update-kamar.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('KAMAR')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(Role.ADMIN)
@Controller('kamar')
export class KamarController {
  constructor(private readonly kamarService: KamarService) {}

  @Post()
  create(@Body() createKamarDto: CreateKamarDto, @Res() response: Response) {
    return this.kamarService.create(createKamarDto, response);
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.kamarService.findAll(response);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response) {
    return this.kamarService.findOne(id, response);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateKamarDto: UpdateKamarDto,
    @Res() response: Response,
  ) {
    return this.kamarService.update(id, updateKamarDto, response);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() response: Response) {
    return this.kamarService.remove(id, response);
  }
}
