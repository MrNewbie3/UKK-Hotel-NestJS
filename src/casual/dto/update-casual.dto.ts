import { PartialType } from '@nestjs/swagger';
import { CreateCasualDto } from './create-casual.dto';

export class UpdateCasualDto extends PartialType(CreateCasualDto) {}
