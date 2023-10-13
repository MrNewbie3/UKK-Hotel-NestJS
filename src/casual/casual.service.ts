import { Injectable } from '@nestjs/common';
import { CreateCasualDto } from './dto/create-casual.dto';
import { UpdateCasualDto } from './dto/update-casual.dto';
import { Response } from 'express';
@Injectable()
export class CasualService {
  create(createCasualDto: CreateCasualDto, res: Response) {
    return 'This action adds a new casual';
  }

  findAll(res: Response) {
    return `This action returns all casual`;
  }

  findOne(id: number, res: Response) {
    return `This action returns a #${id} casual`;
  }

  update(id: number, updateCasualDto: UpdateCasualDto, res: Response) {
    return `This action updates a #${id} casual`;
  }

  remove(id: number, res: Response) {
    return `This action removes a #${id} casual`;
  }
}
