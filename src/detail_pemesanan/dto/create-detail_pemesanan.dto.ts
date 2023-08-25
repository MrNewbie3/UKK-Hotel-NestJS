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

export class CreateDetailPemesananDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id_pemesanan: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id_kamar: number;

  @IsDate()
  @IsNotEmpty()
  tgl_akses: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  harga: number;
}
