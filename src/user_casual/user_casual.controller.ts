import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCasualService } from './user_casual.service';
import { CreateUserCasualDto } from './dto/create-user_casual.dto';
import { UpdateUserCasualDto } from './dto/update-user_casual.dto';

@Controller('user-casual')
export class UserCasualController {
  constructor(private readonly userCasualService: UserCasualService) {}

  @Post()
  create(@Body() createUserCasualDto: CreateUserCasualDto) {
    return this.userCasualService.create(createUserCasualDto);
  }

  @Get()
  findAll() {
    return this.userCasualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCasualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCasualDto: UpdateUserCasualDto) {
    return this.userCasualService.update(+id, updateUserCasualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCasualService.remove(+id);
  }
}
