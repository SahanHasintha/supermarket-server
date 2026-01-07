import { DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { S3Service } from "../aws/s3.service";

@Injectable()
export class UploadService {
    constructor(private s3Service: S3Service) {}

    async generateUploadUrl(key: string, contentType: string = 'image/jpeg') {
        const s3Client = this.s3Service.getS3Client();
        const bucketName = this.s3Service.getBucketName();
        
        console.log('Bucket name:', bucketName);
        
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        });
        
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    }

    async deleteImages(keys: string[]): Promise<void> {
        const s3Client = this.s3Service.getS3Client();
        const bucketName = this.s3Service.getBucketName();
        const command = new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
                Objects: keys.map(key => ({ Key: key })),
            },
        });
        await s3Client.send(command);
    }
}