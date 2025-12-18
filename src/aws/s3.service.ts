import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {}

  getS3Client(): S3Client {
    if (!this.s3Client) {
      console.log('Creating S3 client with:');
      console.log('AWS_REGION:', this.configService.get('AWS_REGION'));
      console.log('AWS_ACCESS_KEY_ID:', this.configService.get('AWS_ACCESS_KEY_ID') ? 'SET' : 'NOT SET');
      console.log('AWS_SECRET_ACCESS_KEY:', this.configService.get('AWS_SECRET_ACCESS_KEY') ? 'SET' : 'NOT SET');
      
      this.s3Client = new S3Client({
        region: this.configService.get('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
        },
      });
    }
    return this.s3Client;
  }

  getBucketName(): string {
    return this.configService.get('AWS_BUCKET_NAME');
  }
}
