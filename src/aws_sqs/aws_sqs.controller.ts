// src/aws/aws-sqs.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwsSqsService } from './aws_sqs.service';

@Controller('aws-sqs')
export class AwsSqsController {
  constructor(private readonly sqsService: AwsSqsService) {}

  @Post('send')
  send(@Body('message') message: string) {
    return this.sqsService.sendMessage(message);
  }

  @Get('receive')
  async receive() {
    const messages = await this.sqsService.receiveMessages();
    return messages;
  }
}
