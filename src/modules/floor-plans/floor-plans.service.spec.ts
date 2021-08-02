import { Test, TestingModule } from '@nestjs/testing';
import { FloorPlansService } from './floor-plans.service';

describe('FloorPlansService', () => {
  let service: FloorPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloorPlansService],
    }).compile();

    service = module.get<FloorPlansService>(FloorPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
