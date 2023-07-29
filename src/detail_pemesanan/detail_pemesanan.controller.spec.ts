import { Test, TestingModule } from '@nestjs/testing';
import { DetailPemesananController } from './detail_pemesanan.controller';
import { DetailPemesananService } from './detail_pemesanan.service';

describe('DetailPemesananController', () => {
  let controller: DetailPemesananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailPemesananController],
      providers: [DetailPemesananService],
    }).compile();

    controller = module.get<DetailPemesananController>(DetailPemesananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
