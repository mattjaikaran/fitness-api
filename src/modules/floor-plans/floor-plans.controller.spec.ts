import { Test, TestingModule } from '@nestjs/testing';
import { FloorPlansController } from './floor-plans.controller';

describe('FloorPlansController', () => {
  let controller: FloorPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorPlansController],
    }).compile();

    controller = module.get<FloorPlansController>(FloorPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
