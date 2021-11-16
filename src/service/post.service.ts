import { getConnection } from "typeorm";
import Post from "../entity/post.entity";
import { PostRepository } from "../repository/post.repository";

export class PostService {
  private readonly postRepository: PostRepository;

  constructor() {
    this.postRepository = getConnection().getCustomRepository(PostRepository);
  }

  public index = async () => {
    const posts = await this.postRepository.find();

    return posts;
  };

  public getOne = async (id: number) => {
    const post = await this.postRepository.findOne(id);

    return post;
  };

  public create = async (post: Post) => {
    const newPost = await this.postRepository.save(post);

    return newPost;
  };

  public update = async (post: Post, id: number) => {
    const updatedPost = await this.postRepository.update(id, post);

    return updatedPost;
  };

  public delete = async (id: number) => {
    const deletedPost = await this.postRepository.delete(id);

    return deletedPost;
  };
}
