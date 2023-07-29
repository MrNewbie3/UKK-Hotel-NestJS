import { PartialType } from '@nestjs/mapped-types';
import { CreateTipeKamarDto } from './create-tipe_kamar.dto';

export class UpdateTipeKamarDto extends PartialType(CreateTipeKamarDto) {}
