import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../entity/role.entity";
import Controller from "../interface/controller.interface";
import { RoleService } from "../service/role.service";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { RoleDTO } from "../dto/role.dto";

export class RoleController implements Controller {
  public path: string = "/roles";
  public router: Router;
  private readonly roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
    this.router = Router();
    this.routes();
  }

  private index = async (req: Request, res: Response) => {
    const roles = await this.roleService.index();

    res.json(roles);
  };

  private create = async (req: Request, res: Response) => {
    const user = req.body as Role;
  };

  private getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const role = await this.roleService.getOne(Number(id));

    res.json(role);
  };

  private update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const role = req.body as Role;

    res.json(this.roleService.update(role, Number(id)));
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      await this.roleService.delete(Number(id));
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
      .post(this.path, validationMiddleware(RoleDTO), this.create)
      .put(`${this.path}/:id`, validationMiddleware(RoleDTO, true), this.update)
      .delete(`${this.path}/:id`, this.delete);
  }
}
