import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransaksiDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  nomor: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  nama_pemesan: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email_pemesan: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  tgl_pemesanan: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  tgl_check_in: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  tgl_check_out: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nama_tamu: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  jumlah_kamar: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  id_tipe_kamar: number;

  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty()
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  user_id: number;
}
