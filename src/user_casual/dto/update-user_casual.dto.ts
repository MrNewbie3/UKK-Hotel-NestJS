import { PartialType } from '@nestjs/swagger';
import { CreateUserCasualDto } from './create-user_casual.dto';

export class UpdateUserCasualDto extends PartialType(CreateUserCasualDto) {}
