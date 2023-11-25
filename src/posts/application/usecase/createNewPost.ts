import { Injectable } from '@nestjs/common';
import { IRepository } from '../ports/IRepository';
import { Post } from 'src/posts/domain/post';

@Injectable()
export class CreateNewPost {
    constructor(
        private readonly postRepository: IRepository,
    ){}

    async execute(post:Post){
        await this.postRepository.save(post);
    }
}