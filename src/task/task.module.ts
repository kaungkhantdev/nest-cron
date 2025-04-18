import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { AwsSqsModule } from 'src/aws_sqs/aws_sqs.module';

@Module({
  imports: [AwsSqsModule],
  providers: [TaskService],
})
export class TaskModule {}
