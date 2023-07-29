import { Test, TestingModule } from '@nestjs/testing';
import { TipeKamarService } from './tipe_kamar.service';

describe('TipeKamarService', () => {
  let service: TipeKamarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipeKamarService],
    }).compile();

    service = module.get<TipeKamarService>(TipeKamarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
