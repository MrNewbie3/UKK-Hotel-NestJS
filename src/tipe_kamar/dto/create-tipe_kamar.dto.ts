import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTipeKamarDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsNumber()
  @IsNotEmpty()
  harga: number;

  @IsString()
  @IsNotEmpty()
  deskripsi: string;

  @IsString()
  foto: string;
}
