import { Test, TestingModule } from '@nestjs/testing';
import { UserCasualController } from './user_casual.controller';
import { UserCasualService } from './user_casual.service';

describe('UserCasualController', () => {
  let controller: UserCasualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCasualController],
      providers: [UserCasualService],
    }).compile();

    controller = module.get<UserCasualController>(UserCasualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
