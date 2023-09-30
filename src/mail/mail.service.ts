import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as nodemailer from 'nodemailer';
import { HelperService } from 'src/helper/helper.service';
import { Response } from 'express';
@Injectable()
export class MailService {
  private readonly transporter;
  constructor(private helper: HelperService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }

  async create(sendEmailDto: CreateMailDto, response: Response) {
    try {
      const sendMail = await this.transporter.sendMail({
        from: 'atharafiaffandy@gmail.com',
        to: sendEmailDto.to,
        subject: sendEmailDto.subject,
        html: sendEmailDto.body,
      });
      return this.helper.successWrapper(response, sendMail.accepted);
    } catch (error) {
      return this.helper.internalServerErrorWrapper(response, error);
    }
  }
}
