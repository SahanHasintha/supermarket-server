import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "src/aws/s3.client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
    async generateUploadUrl(key: string, contentType: string = 'image/jpeg') {
        console.log('process.env.AWS_BUCKET_NAME', process.env.AWS_BUCKET_NAME);
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // Extended to 1 hour
        return url;
    }
}