import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}
  @Get()
  getUsers(@Res() response: Response): Promise<Response<any[]>> {
    return this.appService.getUser(response);
  }

  @Get(':id')
  getSingle(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.appService.getSingleUser(id, response);
  }

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  createData(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: createUserDto,
    @UploadedFile() foto: Buffer,
  ): Promise<Response<any>> {
    return this.appService.postUser(request, response, body, foto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('foto'))
  updateData(
    @Body() body: updateUserDto,
    @Res() res: Response,
    @Param('id') id: number,
    @UploadedFile() foto: Buffer,
  ): Promise<Response<any>> {
    return this.appService.updateUser(id, res, body, foto);
  }
  @Delete(':id')
  deleteData(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response<any>> {
    return this.appService.deleteUser(response, id);
  }
}
