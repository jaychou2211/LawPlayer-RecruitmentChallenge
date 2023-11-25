// image-upload.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IRepository } from 'src/posts/application/ports/IRepository';
import { Post } from 'src/posts/domain/post';
import { STATUS } from 'src/posts/domain/status';
import { IImageUploader } from './ports/IImageUploader';

@Injectable()
export class ImageUploadService {
  public uploadQueue: Post[] = [];
  constructor(
    private readonly postRepository: IRepository,
    private readonly imageUploader: IImageUploader,
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchPosts() {
    // Fetch posts 
    const posts = await this.postRepository.find({ imgurCoverUrl: null, status: STATUS.IDLE });
    // Add the fetched posts to an upload queue.
    this.uploadQueue = [...this.uploadQueue, ...posts];
    // Upload the images sequentially.
    if (this.uploadQueue.length) this.uploadImages();
  }

  private async uploadImages() {
    const posts = this.uploadQueue;
    for (let post of posts) {
      // On process: Set status to UPLOADING.
      post.status = STATUS.UPLOADING;
      this.postRepository.save(post);

      this.uploadImageAndUpdatePost(post);

      // FIFO
      posts.shift();
    }
  }

  private async uploadImageAndUpdatePost(post: Post) {
    try {
      const imgurCoverUrl = await this.imageUploader.execute(post.coverUrl);
      if (!imgurCoverUrl) throw new Error('Image upload failed');
      post.imgurCoverUrl = imgurCoverUrl;
      // On success: Set imgurCoverUrl to the imgur.com URL and status to DONE.
      post.status = STATUS.DONE;
    } catch (e) {
      // On error: Set status to ERROR and leave imgurCoverUrl unchanged.
      post.status = STATUS.ERROR;
    }
    await this.postRepository.save(post)
  }
}
