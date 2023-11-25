import { Body, Controller, Get, Post, UsePipes, ValidationPipe,BadRequestException } from '@nestjs/common';
import { CreateNewPost } from 'src/posts/application/usecase/createNewPost';
import { ListAllPosts } from 'src/posts/application/usecase/listAllPosts';
import { Post as PostModel } from 'src/posts/domain/post';
import { CreatePostDto } from './dtos/createPost.dto';
import { STATUS } from 'src/posts/domain/status';

@Controller('posts')
export class PostController {
    constructor(
        private createNewPostUseCase: CreateNewPost,
        private listAllPostsUseCase: ListAllPosts,
    ) { }

    @Get()
    async findAll(): Promise<PostModel[]> {
        return await this.listAllPostsUseCase.execute();
    }

    @Post()
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const message = errors.map(error =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`).join('. ');
          throw new BadRequestException(message);
        },
      }))
    async create(@Body() createPostDto: CreatePostDto) {
        const { coverUrl } = createPostDto;
        await this.createNewPostUseCase.execute(PostModel(null, coverUrl, null, STATUS.IDLE));
    }
}