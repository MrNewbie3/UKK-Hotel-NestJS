import { Module } from '@nestjs/common';
import { KamarService } from './kamar.service';
import { KamarController } from './kamar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelperModule } from 'src/helper/helper.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [PrismaModule, HelperModule, ServiceModule],
  controllers: [KamarController],
  providers: [KamarService],
})
export class KamarModule {}
