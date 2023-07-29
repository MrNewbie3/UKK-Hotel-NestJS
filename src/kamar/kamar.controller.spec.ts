import { Test, TestingModule } from '@nestjs/testing';
import { KamarController } from './kamar.controller';
import { KamarService } from './kamar.service';

describe('KamarController', () => {
  let controller: KamarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KamarController],
      providers: [KamarService],
    }).compile();

    controller = module.get<KamarController>(KamarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
