import { Test, TestingModule } from '@nestjs/testing';
import { PortoService } from './porto.service';

describe('PortoService', () => {
  let service: PortoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortoService],
    }).compile();

    service = module.get<PortoService>(PortoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
