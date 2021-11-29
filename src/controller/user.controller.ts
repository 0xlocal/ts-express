import Controller from "../interface/controller.interface";
import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";
import { User } from "../entity/user.entity";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { UserDTO } from "../dto/user.dto";

export class UserController implements Controller {
  public path: string = "/users";
  public router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const users = await this.userService.index();

    res.json(users);
  };

  public getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.userService.getOne(Number(id));

    return res.json(user);
  };

  //   public create = async (req: Request, res: Response) => {
  //     const user = req.body as UserDTO;
  //     const newUser =
  //   };

  public update = async (req: Request, res: Response) => {
    const user = req.body as User;
    const id = req.params.id;

    res.json(this.userService.update(user, Number(id)));
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    res.status(200).json();
  };

  public routes() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .get(this.path, validationMiddleware(UserDTO), this.index)
      .get(`${this.path}/:id`, validationMiddleware(UserDTO), this.getOne)
      .put(`${this.path}/:id`, validationMiddleware(UserDTO, true), this.update)
      .delete(`${this.path}/:id`, this.delete);
  }
}
