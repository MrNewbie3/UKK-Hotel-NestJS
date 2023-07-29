import { Test, TestingModule } from '@nestjs/testing';
import { TipeKamarController } from './tipe_kamar.controller';
import { TipeKamarService } from './tipe_kamar.service';

describe('TipeKamarController', () => {
  let controller: TipeKamarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipeKamarController],
      providers: [TipeKamarService],
    }).compile();

    controller = module.get<TipeKamarController>(TipeKamarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
