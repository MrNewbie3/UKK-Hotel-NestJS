import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nama: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
