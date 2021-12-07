import Controller from "../interface/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
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

  private index = async (req: Request, res: Response) => {
    const users = await this.userService.index();

    res.json(users);
  };

  private getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.userService.getOne(Number(id));

    res.json(user);
  };

  // * still on consideration, should be create or not
  //   public create = async (req: Request, res: Response) => {
  //     const user = req.body as UserDTO;
  //     const newUser =
  //   };

  private update = async (req: Request, res: Response) => {
    const user = req.body as User;
    const id = req.params.id;

    res.json(this.userService.update(user, Number(id)));
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      await this.userService.delete(Number(id));
      res.status(200).json();
    } catch (error) {
      next(error);
    }
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
