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
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}
  @Get()
  getUsers(): Promise<any[]> {
    return this.appService.getUser();
  }

  @Get(':id')
  getSingle(@Param('id') id: number) {
    return this.appService.getSingleUser(id);
  }

  @Post()
  createData(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: createUserDto,
  ): Promise<any> {
    return this.appService.postUser(request, response, body);
  }

  @Put(':id')
  updateData(
    @Body() body: updateUserDto,
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    return this.appService.updateUser(id, res, body);
  }
  @Delete(':id')
  deleteData(@Param('id') id: number, @Res() response: Response) {
    return this.appService.deleteUser(response, id);
  }
}
