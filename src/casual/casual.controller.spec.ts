import { Test, TestingModule } from '@nestjs/testing';
import { CasualController } from './casual.controller';
import { CasualService } from './casual.service';

describe('CasualController', () => {
  let controller: CasualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasualController],
      providers: [CasualService],
    }).compile();

    controller = module.get<CasualController>(CasualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
