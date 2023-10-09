import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import * as nodemailer from 'nodemailer';
import { HelperService } from 'src/helper/helper.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import base64url from 'base64url';
import { layout } from './layout/mail.layout';
@Injectable()
export class MailService {
  private readonly transporter;
  constructor(
    private helper: HelperService,
    private readonly prisma: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
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
      await this.prisma.user.update({
        where: {
          email: sendEmailDto.to,
        },
        data: {
          auth_code: saveUrl,
        },
      });
      const sendMail = await this.transporter.sendMail({
        from: 'atharafiaffandy@gmail.com',
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
      const isValid = decodePath === data.auth_code;
      console.log(decodePath);
      console.log(data.auth_code);
      console.log(isValid);

      if (!isValid) {
        return this.create(
          email,
          response,
          "Invalid auth code, we've send new email to you ",
        );
      }
      const updatedData = await this.prisma.user.update({
        where: {
          email: data.email,
        },
        data: {
          is_active: true,
        },
      });
      return this.helper.successWrapper(
        response,
        updatedData,
        'success validate user',
      );
    } catch (error) {
      console.log(error);
      return this.helper.internalServerErrorWrapper(response, error);
    }
  }
}
