import { Injectable } from '@nestjs/common';
import { CreatePortoDto } from './dto/create-porto.dto';
import { UpdatePortoDto } from './dto/update-porto.dto';

@Injectable()
export class PortoService {
  create(createPortoDto: CreatePortoDto) {
    return 'This action adds a new porto';
  }

  findAll() {
    return `This action returns all porto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} porto`;
  }

  update(id: number, updatePortoDto: UpdatePortoDto) {
    return `This action updates a #${id} porto`;
  }

  remove(id: number) {
    return `This action removes a #${id} porto`;
  }
}
