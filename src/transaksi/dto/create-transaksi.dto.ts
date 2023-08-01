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
  nomor: number;

  @IsString()
  @IsNotEmpty()
  nama_pemesan: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email_pemesan: string;

  @IsNotEmpty()
  @IsDate()
  tgl_pemesanan: string;

  @IsNotEmpty()
  @IsDate()
  tgl_check_in: string;

  @IsNotEmpty()
  @IsDate()
  tgl_check_out: string;

  @IsString()
  @IsNotEmpty()
  nama_tamu: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  jumlah_kamar: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id_tipe_kamar: number;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;
}
