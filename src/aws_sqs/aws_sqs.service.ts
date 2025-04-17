// src/aws/aws-sqs.service.ts
import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

@Injectable()
export class AwsSqsService {
  private readonly sqsClient = new SQSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  private readonly queueUrl = process.env.AWS_SQS_QUEUE_URL!;

  async sendMessage(messageBody: string) {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: messageBody,
    });

    return this.sqsClient.send(command);
  }

  async receiveMessages() {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 10,
    });

    const result = await this.sqsClient.send(command);
    return result.Messages;
  }

  async deleteMessage(receiptHandle: string) {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    return this.sqsClient.send(command);
  }
}
