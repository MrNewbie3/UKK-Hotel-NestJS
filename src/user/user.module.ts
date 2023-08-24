import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceModule } from 'src/service/service.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [PrismaModule, ServiceModule, HelperModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
