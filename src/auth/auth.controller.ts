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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
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
  create(
    @Body() createAuthDto: CreateAuthDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.authService.signIn(createAuthDto, request, response);
  }
}
