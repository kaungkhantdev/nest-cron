import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AwsSqsModule } from './aws_sqs/aws_sqs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TaskModule,
    AwsSqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
