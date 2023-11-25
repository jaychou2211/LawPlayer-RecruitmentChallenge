import { Post } from "src/posts/domain/post"
import { STATUS } from "src/posts/domain/status"

export abstract class IRepository {
    public abstract findAll(): Promise<Post[]>;
    public abstract find(options: PostOptions): Promise<Post[]>;
    public abstract save(post: Post): Promise<void>;

}

export interface PostOptions {
    id?: number | null,
    coverUrl?: string,
    imgurCoverUrl?: string | null,
    status?: STATUS
}