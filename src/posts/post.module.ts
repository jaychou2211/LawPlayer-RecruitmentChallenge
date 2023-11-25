import { PostController } from "./infrastructure/primaries/post.controller";
import { ListAllPosts } from "./application/usecase/listAllPosts";
import { CreateNewPost } from "./application/usecase/createNewPost";
import { IRepository } from "./application/ports/IRepository";
import { PostRepository } from "./infrastructure/secondaries/post.repository";
import { Module } from "@nestjs/common";

// Dependency inversion
const repository = {
    provide: IRepository, // abstract
    useClass: PostRepository, // concrete
}

const useCases = [CreateNewPost,ListAllPosts];

@Module({
    providers:[
        ...useCases,
        PostController,
        repository,
    ],
    exports: [PostController,...useCases]
})
export class PostModule {}