import { Injectable } from '@nestjs/common';
import { CreateKamarDto } from './dto/create-kamar.dto';
import { UpdateKamarDto } from './dto/update-kamar.dto';

@Injectable()
export class KamarService {
  create(createKamarDto: CreateKamarDto) {
    return 'This action adds a new kamar';
  }

  findAll() {
    return `This action returns all kamar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kamar`;
  }

  update(id: number, updateKamarDto: UpdateKamarDto) {
    return `This action updates a #${id} kamar`;
  }

  remove(id: number) {
    return `This action removes a #${id} kamar`;
  }
}
