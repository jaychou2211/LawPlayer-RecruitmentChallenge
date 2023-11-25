import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/posts/application/ports/IRepository';
import { Post } from 'src/posts/domain/post';
import { PostOptions } from 'src/posts/application/ports/IRepository';
import { LowdbService } from 'src/common/lowdb/lowdb.service';

@Injectable()
export class PostRepository implements IRepository {
    public currentId: number = 0;

    constructor(
        private lowdbService: LowdbService,
    ) { }

    async findAll(): Promise<Post[]> {
        return Array.from(this.lowdbService.db.get("posts").value());
    }

    async save(post: Post): Promise<void> {
        if(!this.currentId) this.currentId = this.lowdbService.db.get("posts").findLast().value().id;
        if (!post.id) {
            post.id = ++this.currentId;
            console.log(post);
            await this.lowdbService.db.get("posts").push(post).write();
        } else {
            await this.lowdbService.db.get("posts").find({ id: post.id }).assign(post).write();;
        }
        return;
    }

    async find(options: PostOptions): Promise<Post[]> {
        return this.lowdbService.db.get("posts").filter(options).value();
    }
}