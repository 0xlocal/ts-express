import { Request, Response, Router } from "express";
import { PostService } from "../service/post.service";
import Controller from "../interface/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import Post from "../entity/post.entity";
import User from "../entity/user.entity";

export class PostController implements Controller {
  public path: string = "/posts";
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

  public getOne = async (req: Request, res: Response) => {
    const id = req.params["id"];
    const post = await this.postService.getOne(Number(id));

    res.send(post).json();
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
    this.router.get(this.path, this.index);
    this.router.get(`${this.path}/:id`, this.getOne);

    this.router
      .all(`${this.path}/*`, authMiddleware)
      .put(`${this.path}/:id`, validationMiddleware(User, true), this.update)
      .delete(`${this.path}/:id`, this.delete)
      .post(this.path, authMiddleware, validationMiddleware(User), this.create);

    // this.router.post("/", this.create);
    // this.router.put("/:id", this.update);
    // this.router.delete("/:id", this.delete);
  }
}
