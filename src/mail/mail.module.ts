import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [HelperModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
