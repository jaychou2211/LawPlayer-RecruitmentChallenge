import { IsUrl, IsNotEmpty, ValidateIf, IsObject } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsUrl()
  coverUrl: string;
}