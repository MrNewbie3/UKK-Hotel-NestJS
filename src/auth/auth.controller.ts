import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get('/user')
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
    ): Promise<any> {
        return this.authService.signIn(createAuthDto, request, response);
    }
}
