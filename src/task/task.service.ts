import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AwsSqsService } from 'src/aws_sqs/aws_sqs.service';

@Injectable()
export class TaskService {
  constructor(private readonly awsSqsService: AwsSqsService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
    // const data = await this.awsSqsService.receiveMessages();
    // console.info(data);
  }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
