import { Module } from '@nestjs/common';
import { PostModule } from '../posts/post.module';
import { PostController } from '../posts/infrastructure/primaries/post.controller';
import { LowdbModule } from 'src/common/lowdb/lowdb.module';
import { ImageUploadModule } from 'src/imageUpload/imageUpload.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    LowdbModule,
    PostModule,
    ImageUploadModule,
    ScheduleModule.forRoot()],
  controllers: [PostController],
})
export class AppModule { }
