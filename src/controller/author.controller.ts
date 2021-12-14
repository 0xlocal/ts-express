import { NextFunction, Request, Response, Router } from "express";
import { Author } from "../entity/author.entity";
import Controller from "../interface/controller.interface";
import { AuthorService } from "../service/author.service";
import { AuthorDTO } from "../dto/author.dto";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import HttpException from "../exception/http.exception";

export class AuthorController implements Controller {
  public path: string = "/authors";
  public router: Router;
  private readonly authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
    this.router = Router();
    this.routes();
  }

  private index = async (req: Request, res: Response) => {
    const authors = await this.authorService.index();

    res.json(authors);
  };

  private getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const author = await this.authorService.getOne(Number(id));

    if (author) {
      res.json(author);
    } else {
      next(new HttpException(404, `Author with id ${id} not found`));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const author = req.body as Author;
      const newAuthor = await this.authorService.create(author);

      res.status(201).json(newAuthor);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const author = req.body as Author;
      const updatedAuthor = await this.authorService.update(author, Number(id));

      res.json(updatedAuthor);
    } catch (error) {
      next(error);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.authorService.delete(Number(id));

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
      .post(this.path, validationMiddleware(AuthorDTO), this.create)
      .put(
        `${this.path}/:id`,
        validationMiddleware(AuthorDTO, true),
        this.update
      )
      .delete(`${this.path}/:id`, this.delete);
  }
}
