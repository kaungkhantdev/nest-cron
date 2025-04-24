import { Test, TestingModule } from '@nestjs/testing';
import { AwsSqsController } from './aws_sqs.controller';

describe('AwsSqsController', () => {
  let controller: AwsSqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsSqsController],
    }).compile();

    controller = module.get<AwsSqsController>(AwsSqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
