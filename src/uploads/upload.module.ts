import { AwsModule } from "src/aws/aws.module";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
    imports: [AwsModule],
})
export class UploadModule {}