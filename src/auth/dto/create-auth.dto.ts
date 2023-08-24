import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
