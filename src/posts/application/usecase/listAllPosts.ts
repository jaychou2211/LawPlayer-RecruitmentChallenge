import { Injectable } from '@nestjs/common';
import { IRepository } from '../ports/IRepository';

@Injectable()
export class ListAllPosts {
    constructor(
        private readonly postRepository: IRepository,
    ){}

    async execute(){
        const posts = await this.postRepository.findAll();
        return posts;
    }
}