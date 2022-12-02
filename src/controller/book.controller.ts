import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interface/controller.interface";
import { BookService } from "../service/book.service";
import authMiddleware from "../middleware/auth.middleware";
import { BookDTO } from "../dto/book.dto";
import validationMiddleware from "../middleware/validation.middleware";
import { Book } from "../entity/book.entity";

export class BookController implements Controller {
  public path: string = "/books";
  public router: Router;
  private readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
    this.router = Router();
    this.routes();
  }

  private index = async (req: Request, res: Response) => {
    const books = await this.bookService.index();

    res.json(books);
  };

  private getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const book = await this.bookService.getOne(Number(id));

    res.json(book);
  };

  private create = async (req: Request, res: Response) => {
    const book = req.body as Book;
    const newBook = await this.bookService.create(book);

    res.status(201).json(newBook);
  };

  private update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const book = req.body as Book;

    const updatedBook = await this.bookService.update(book, Number(id));

    res.json(updatedBook);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      await this.bookService.delete(Number(id));

      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  public routes() {
    this.router
      // .all(`${this.path}/*`, authMiddleware)
      .get(this.path, this.index)
      .get(`${this.path}/:id`, this.getOne)
      .post(this.path, validationMiddleware(BookDTO), this.create)
      .patch(
        `${this.path}/:id`,
        validationMiddleware(BookDTO, true),
        this.update
      )
      .delete(`${this.path}/:id`, this.delete);
  }
}
