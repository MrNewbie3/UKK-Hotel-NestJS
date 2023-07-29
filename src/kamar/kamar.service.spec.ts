import { Test, TestingModule } from '@nestjs/testing';
import { KamarService } from './kamar.service';

describe('KamarService', () => {
  let service: KamarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KamarService],
    }).compile();

    service = module.get<KamarService>(KamarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
