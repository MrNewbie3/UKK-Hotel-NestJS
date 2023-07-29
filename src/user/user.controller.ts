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

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}
  @Get()
  getUsers(): Promise<any[]> {
    return this.appService.getUser();
  }

  @Get(':id')
  getSingle(@Param() id: number) {
    return this.appService.getSingleUser(id);
  }

  @Post()
  createData(@Req() request: Request, @Body() body: string): Promise<any> {
    return this.appService.postUser(request, body);
  }

  @Put(':id')
  updateData(@Body() body: string, @Param() id: number): Promise<any> {
    return this.appService.updateUser(id, body);
  }
  @Delete(':id')
  deleteData(@Param() id: number) {
    return this.appService.deleteUser(id);
  }
}
