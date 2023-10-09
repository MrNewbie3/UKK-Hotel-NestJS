import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDTO {
  @IsString()
  @IsOptional()
  nama_tamu: string;
  @IsString()
  @IsOptional()
  tgl_check_in: string;
  @IsNumber()
  @IsOptional()
  id_tipe_kamar: number;
  @IsString()
  @IsOptional()
  user_id: number;
}
