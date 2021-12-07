import { NextFunction, Request, Response, Router } from "express";
import { Authority } from "../entity/authority.entity";
import Controller from "../interface/controller.interface";
import { AuthorityService } from "../service/authority.service";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { AuthorityDTO } from "../dto/authority.dto";

export class AuthorityController implements Controller {
  public path: string = "/authorities";
  public router: Router;
  private readonly authorityService: AuthorityService;

  constructor() {
    this.authorityService = new AuthorityService();
    this.router = Router();
    this.routes();
  }

  private index = async (req: Request, res: Response) => {
    const authorities = await this.authorityService.index();

    res.json(authorities);
  };

  private getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const authority = await this.authorityService.getOne(Number(id));

    res.json(authority);
  };

  private create = async (req: Request, res: Response) => {
    const authority = req.body as Authority;

    const newAuthority = await this.authorityService.create(authority);
    res.status(201).json(newAuthority);
  };

  private update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const authority = req.body as Authority;
    const updatedAuthority = await this.authorityService.update(
      authority,
      Number(id)
    );

    res.json(updatedAuthority);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      await this.authorityService.delete(Number(id));
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  public routes() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .get(this.path, this.index)
      .get(`${this.path}/:id`, this.getOne)
      .post(this.path, validationMiddleware(AuthorityDTO), this.create)
      .put(
        `${this.path}/:id`,
        validationMiddleware(AuthorityDTO, true),
        this.update
      )
      .delete(`${this.path}/:id`, this.delete);
  }
}
