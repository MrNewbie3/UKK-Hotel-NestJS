import { Injectable } from '@nestjs/common';
import base64url from 'base64url';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import * as nodemailer from 'nodemailer';
import { envi } from 'src/config/envi';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { layout } from './layout/mail.layout';
@Injectable()
export class MailService {
  private readonly transporter;
  constructor(
    private helper: HelperService,
    private readonly prisma: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: envi.SERVICE,
      auth: {
        user: envi.EMAIL,
        pass: envi.PASS,
      },
    });
  }

  async create(
    sendEmailDto: CreateMailDto,
    response: Response,
    message?: string,
  ) {
    try {
      const passcode = await bcrypt.hash(sendEmailDto.to, 10);
      const saveUrl = base64url.fromBase64(passcode);
      const isDataExist = await this.prisma.user.findUnique({
        where: { email: sendEmailDto.to },
      });
      if (!isDataExist) {
        return this.helper.notFoundWrapper(response, [sendEmailDto]);
      }

      const sendMail = await this.transporter.sendMail({
        from: envi.EMAIL,
        to: sendEmailDto.to,
        subject: 'Email Verification',
        html: layout(saveUrl),
      });
      if (message) {
        return this.helper.badRequestHelper(
          response,
          sendMail.accepted,
          message,
        );
      }
      return this.helper.successWrapper(response, sendMail.accepted);
    } catch (error) {
      console.log(error);
      return this.helper.internalServerErrorWrapper(response, error);
    }
  }
  async validate(response: Response, params: string, email: CreateMailDto) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          email: email.to,
        },
      });
      if (!data) {
        return this.helper.notFoundWrapper(response, [email]);
      }
      const decodePath = base64url.fromBase64(params);

      return this.helper.successWrapper(
        response,
        'updatedData',
        'success validate user',
      );
    } catch (error) {
      console.log(error);
      return this.helper.internalServerErrorWrapper(response, error);
    }
  }
}
