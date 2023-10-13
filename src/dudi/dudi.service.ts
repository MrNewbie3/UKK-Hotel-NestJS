import { Injectable } from '@nestjs/common';
import { CreateDudiDto } from './dto/create-dudi.dto';
import { UpdateDudiDto } from './dto/update-dudi.dto';

@Injectable()
export class DudiService {
  create(createDudiDto: CreateDudiDto) {
    return 'This action adds a new dudi';
  }

  findAll() {
    return `This action returns all dudi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dudi`;
  }

  update(id: number, updateDudiDto: UpdateDudiDto) {
    return `This action updates a #${id} dudi`;
  }

  remove(id: number) {
    return `This action removes a #${id} dudi`;
  }
}
