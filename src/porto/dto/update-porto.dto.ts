import { PartialType } from '@nestjs/swagger';
import { CreatePortoDto } from './create-porto.dto';

export class UpdatePortoDto extends PartialType(CreatePortoDto) {}
