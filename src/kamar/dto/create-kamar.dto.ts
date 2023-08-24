import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateKamarDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  nomor: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id_tipe_kamar: number;
}
