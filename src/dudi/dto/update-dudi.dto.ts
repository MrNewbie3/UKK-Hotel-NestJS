import { PartialType } from '@nestjs/swagger';
import { CreateDudiDto } from './create-dudi.dto';

export class UpdateDudiDto extends PartialType(CreateDudiDto) {}
