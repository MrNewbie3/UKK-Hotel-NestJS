import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUserAuth(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    return this.authService.getUserAuth(request, response);
  }

  @Post()
  create(@Res() response: Response, @Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto, response);
  }
}
