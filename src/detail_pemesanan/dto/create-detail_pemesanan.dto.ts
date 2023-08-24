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
  id_pemesanan: number;
  id_kamar: number;
  tgl_akses: string;
  harga: number;
}
