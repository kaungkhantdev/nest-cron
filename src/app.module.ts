import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AwsSqsModule } from './aws_sqs/aws_sqs.module';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule, AwsSqsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
