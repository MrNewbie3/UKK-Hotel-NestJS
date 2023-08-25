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
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { Response } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TRANSAKSI')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(Role.RESEPSIONIS)
@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Post()
  @Roles(Role.USER)
  create(
    @Body() createTransaksiDto: CreateTransaksiDto,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.createTransaction(
      createTransaksiDto,
      response,
    );
  }

  @Get()
  findAll(@Res() response: Response): Promise<Response<any>> {
    return this.transaksiService.findAllTransaction(response);
  }

  @Get(':id')
  @Roles(Role.USER)
  findOne(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.findOneTransaction(id, response);
  }

  @Patch(':id')
  update(
    @Body() updateTransaksiDto: UpdateTransaksiDto,
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.updateTransaction(
      id,
      response,
      updateTransaksiDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.transaksiService.removeTransaction(id, response);
  }
}
