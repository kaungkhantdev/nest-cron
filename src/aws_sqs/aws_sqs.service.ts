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
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const queueUrl = process.env.AWS_SQS_QUEUE_URL;
    const region = process.env.AWS_REGION ?? 'ap-southeast-1';

    if (!accessKeyId || !secretAccessKey || !queueUrl) {
      throw new Error(
        'Missing AWS SQS configuration in environment variables.',
      );
    }

    this.queueUrl = queueUrl;

    this.sqsClient = new SQSClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

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
    const data = result.Messages;

    // // Use for...of loop to ensure async deletion works correctly
    // if (data) {
    //   for (const obj of data) {
    //     if (obj.ReceiptHandle) {
    //       await this.deleteMessage(obj.ReceiptHandle); // Wait for the message to be deleted before continuing
    //     }
    //   }
    // }

    return data;
  }

  async deleteMessage(receiptHandle: string) {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    return this.sqsClient.send(command);
  }
}
