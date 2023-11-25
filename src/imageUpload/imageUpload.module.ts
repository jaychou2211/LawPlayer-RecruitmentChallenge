import { Module } from '@nestjs/common';
import { ImageUploadService } from './application/imageUpload.service';
import { IRepository } from 'src/posts/application/ports/IRepository';
import { PostRepository } from 'src/posts/infrastructure/secondaries/post.repository';
import { IImageUploader } from './application/ports/IImageUploader';
import { ImgurUploader } from './infrastructure/imgurUploader';

// Dependency inversion
const repository = {
    provide: IRepository, // abstract
    useClass: PostRepository, // concrete
}

const imageUploader = {
    provide: IImageUploader, // abstract
    useClass: ImgurUploader, // concrete
}

@Module({
    providers: [ImageUploadService, repository, imageUploader],
    exports: [ImageUploadService]
})
export class ImageUploadModule { }
