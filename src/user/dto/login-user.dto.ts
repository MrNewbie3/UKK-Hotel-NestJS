import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto extends PartialType(createUserDto) {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
