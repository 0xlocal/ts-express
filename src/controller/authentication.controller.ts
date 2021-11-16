import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interface/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import { AuthenticationService } from "../service/authentication.service";
import { UserDTO } from "../dto/user.dto";

export class AuthenticationController implements Controller {
  public path: string = "/auth";
  public router: Router;
  private readonly authService: AuthenticationService;

  constructor() {
    this.authService = new AuthenticationService();
    this.router = Router();
    this.routes();
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: UserDTO = req.body;
    try {
      const { cookie, user } = await this.authService.register(userData);
      res.setHeader("Set-Cookie", [cookie]);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  };

  private loggingIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const loginData: UserDTO = req.body;
    try {
      const { cookie, user } = await this.authService.login(loginData);
      res.setHeader("Set-Cookie", [cookie]);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    response.send(200);
  };

  public routes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(UserDTO),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(UserDTO),
      this.loggingIn
    );
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }
}
