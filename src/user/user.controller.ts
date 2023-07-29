import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
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
    @Body() body: createUserDto,
  ): Promise<any> {
    return this.appService.postUser(request, body);
  }

  @Put(':id')
  updateData(
    @Body() body: updateUserDto,
    @Param('id') id: number,
  ): Promise<any> {
    return this.appService.updateUser(id, body);
  }
  @Delete(':id')
  deleteData(@Param('id') id: number) {
    return this.appService.deleteUser(id);
  }
}
