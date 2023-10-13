import { Controller, Post, Body, Res, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('EMAIL')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() createMailDto: CreateMailDto, @Res() response: Response) {
    return this.mailService.create(createMailDto, response);
  }
  @Post(':id')
  validate(
    @Body() email: CreateMailDto,
    @Param('id') params: string,
    @Res() response: Response,
  ) {
    return this.mailService.validate(response, params, email);
  }
}
