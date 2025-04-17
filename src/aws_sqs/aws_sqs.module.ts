import { Module } from '@nestjs/common';
import { AwsSqsService } from './aws_sqs.service';
import { AwsSqsController } from './aws_sqs.controller';

@Module({
  providers: [AwsSqsService],
  controllers: [AwsSqsController]
})
export class AwsSqsModule {}
