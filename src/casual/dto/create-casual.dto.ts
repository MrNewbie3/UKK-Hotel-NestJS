import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCasualDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  namaCasual: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  kategoriCasual: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startCasual: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endCasual: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lokasi: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  waktuPelaksanaan: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  statusCasual: string;
}
