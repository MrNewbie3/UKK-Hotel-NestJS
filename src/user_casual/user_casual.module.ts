import { Module } from '@nestjs/common';
import { UserCasualService } from './user_casual.service';
import { UserCasualController } from './user_casual.controller';

@Module({
  controllers: [UserCasualController],
  providers: [UserCasualService]
})
export class UserCasualModule {}
