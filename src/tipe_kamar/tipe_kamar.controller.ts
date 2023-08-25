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
  UseGuards,
} from '@nestjs/common';
import { TipeKamarService } from './tipe_kamar.service';
import { CreateTipeKamarDto } from './dto/create-tipe_kamar.dto';
import { UpdateTipeKamarDto } from './dto/update-tipe_kamar.dto';
import { Response } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TIPE KAMAR')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(Role.ADMIN)
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
  @Roles(Role.USER)
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
