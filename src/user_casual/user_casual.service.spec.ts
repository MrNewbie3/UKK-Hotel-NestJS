import { Test, TestingModule } from '@nestjs/testing';
import { UserCasualService } from './user_casual.service';

describe('UserCasualService', () => {
  let service: UserCasualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCasualService],
    }).compile();

    service = module.get<UserCasualService>(UserCasualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
