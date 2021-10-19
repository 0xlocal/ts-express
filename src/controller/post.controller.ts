import { Request, Response, Router } from "express";
import { Post } from "../entity/post.entity";
import { PostService } from "../service/post.service";

export class PostController {
  public router: Router;
  private readonly postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const posts = await this.postService.index();

    res.send(posts).json();
  };

  public create = async (req: Request, res: Response) => {
    const post = req["body"] as Post;
    const newPost = await this.postService.create(post);

    res.send(newPost);
  };

  public update = async (req: Request, res: Response) => {
    const post = req.body as Post;
    const id = req.params["id"];

    res.send(this.postService.update(post, Number(id)));
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params["id"];

    res.send(this.postService.delete(Number(id)));
  };

  public routes() {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
