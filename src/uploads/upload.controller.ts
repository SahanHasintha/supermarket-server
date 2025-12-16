import { UploadService } from "./upload.service";
import {Controller, Get, Query} from "@nestjs/common";

@Controller('uploads')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Get('generate-upload-url')
    async generateUploadUrl(
        @Query('key') key: string,
        @Query('contentType') contentType?: string
    ) {
        return this.uploadService.generateUploadUrl(key, contentType);
    }
}