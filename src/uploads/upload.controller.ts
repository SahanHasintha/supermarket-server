import { UploadService } from "./upload.service";
import {Controller, Delete, Get, Query, Body} from "@nestjs/common";

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

    @Delete('delete-images')
    async deleteImages(
        @Body('keys') keys: string[]
    ) {
        return this.uploadService.deleteImages(keys);
    }
}