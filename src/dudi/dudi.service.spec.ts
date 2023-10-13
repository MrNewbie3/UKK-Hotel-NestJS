import { Test, TestingModule } from '@nestjs/testing';
import { DudiService } from './dudi.service';

describe('DudiService', () => {
  let service: DudiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DudiService],
    }).compile();

    service = module.get<DudiService>(DudiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
