import { Test, TestingModule } from '@nestjs/testing';
import { DudiController } from './dudi.controller';
import { DudiService } from './dudi.service';

describe('DudiController', () => {
  let controller: DudiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DudiController],
      providers: [DudiService],
    }).compile();

    controller = module.get<DudiController>(DudiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
