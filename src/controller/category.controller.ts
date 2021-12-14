import { NextFunction, Request, Response, Router } from "express";
import { Category } from "../entity/category.entity";
import Controller from "../interface/controller.interface";
import { CategoryService } from "../service/category.service";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { CategoryDTO } from "../dto/category.dto";
import HttpException from "../exception/http.exception";

export class CategoryController implements Controller {
  public path: string = "/categories";
  public router: Router;
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
    this.router = Router();
    this.routes();
  }

  private index = async (req: Request, res: Response) => {
    // * slower than await method
    // this.categoryService.index().then((categories) => res.json(categories));
    const categories = await this.categoryService.index();
    res.json(categories);
  };

  private getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const category = await this.categoryService.getOne(Number(id));

    if (category) {
      res.json(category);
    } else {
      next(new HttpException(404, `Category with id ${id} not found`));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    // * slower than await method
    // const category = req.body as Category;
    // this.categoryService
    //   .create(category)
    //   .then((newCategory) => res.json(newCategory))
    //   .catch((error) => next(error));
    try {
      const category = req.body as Category;
      const newCategory = await this.categoryService.create(category);

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const category = req.body as Category;
      const updatedCategory = await this.categoryService.update(
        category,
        Number(id)
      );

      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.categoryService.delete(Number(id));

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
      .post(this.path, validationMiddleware(CategoryDTO), this.create)
      .put(
        `${this.path}/:id`,
        validationMiddleware(CategoryDTO, true),
        this.update
      )
      .delete(`${this.path}/:id`, this.delete);
  }
}
