import { Injectable } from '@nestjs/common';
import { CreateUserCasualDto } from './dto/create-user_casual.dto';
import { UpdateUserCasualDto } from './dto/update-user_casual.dto';

@Injectable()
export class UserCasualService {
  create(createUserCasualDto: CreateUserCasualDto) {
    return 'This action adds a new userCasual';
  }

  findAll() {
    return `This action returns all userCasual`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCasual`;
  }

  update(id: number, updateUserCasualDto: UpdateUserCasualDto) {
    return `This action updates a #${id} userCasual`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCasual`;
  }
}
