import { Test, TestingModule } from '@nestjs/testing';
import { DetailPemesananService } from './detail_pemesanan.service';

describe('DetailPemesananService', () => {
  let service: DetailPemesananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailPemesananService],
    }).compile();

    service = module.get<DetailPemesananService>(DetailPemesananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
