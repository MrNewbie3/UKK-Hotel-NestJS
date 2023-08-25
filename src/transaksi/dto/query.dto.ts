import { IsOptional, IsString } from 'class-validator';

export class QueryDTO {
  @IsString()
  @IsOptional()
  nama_tamu: string;
  @IsString()
  @IsOptional()
  tgl_check_in: string;
}
