import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTipeKamarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nama: string;

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
  @IsOptional()
  foto: string;
}
