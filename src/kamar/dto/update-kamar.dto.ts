import { PartialType } from '@nestjs/mapped-types';
import { CreateKamarDto } from './create-kamar.dto';

export class UpdateKamarDto extends PartialType(CreateKamarDto) {}
