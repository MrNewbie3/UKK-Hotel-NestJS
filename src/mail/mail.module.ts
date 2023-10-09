import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { HelperModule } from 'src/helper/helper.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HelperModule, PrismaModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
