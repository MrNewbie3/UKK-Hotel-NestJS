import { Test, TestingModule } from '@nestjs/testing';
import { PortoController } from './porto.controller';
import { PortoService } from './porto.service';

describe('PortoController', () => {
  let controller: PortoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortoController],
      providers: [PortoService],
    }).compile();

    controller = module.get<PortoController>(PortoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
