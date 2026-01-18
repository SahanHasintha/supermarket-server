import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './uploads/upload.module';
import { AwsModule } from './aws/aws.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AwsModule,
    DatabaseModule,
    UserModule,
    ProductModule,
    // UploadModule,
    AuthModule,
  ],
})
export class AppModule {}
