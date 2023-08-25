import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTipeKamarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nama: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  harga: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  deskripsi: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  foto: string;
}
