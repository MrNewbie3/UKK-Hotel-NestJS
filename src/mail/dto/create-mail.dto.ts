import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  to: string;
  @IsString()
  @IsOptional()
  subject: string;
  @IsString()
  @IsOptional()
  body: string;
}
