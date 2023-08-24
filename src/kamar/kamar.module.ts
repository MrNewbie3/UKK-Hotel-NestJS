import { Module } from '@nestjs/common';
import { KamarService } from './kamar.service';
import { KamarController } from './kamar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [PrismaModule, HelperModule],
  controllers: [KamarController],
  providers: [KamarService],
})
export class KamarModule {}
