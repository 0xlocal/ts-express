import { AuthorRepository } from "../repository/author.repository";
import { getConnection } from "typeorm";
import { Author } from "../entity/author.entity";
import HttpException from "../exception/http.exception";

export class AuthorService {
  private readonly authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository =
      getConnection().getCustomRepository(AuthorRepository);
  }

  public index = async () => {
    const authors = await this.authorRepository.find();

    return authors;
  };

  public getOne = async (id: number) => {
    const author = await this.authorRepository.findOne(id);

    return author;
  };

  public create = async (author: Author) => {
    const newAuthor = await this.authorRepository.save(author);

    return newAuthor;
  };

  public update = async (author: Author, id: number) => {
    const updatedAuthor = await this.authorRepository.update(id, author);

    return updatedAuthor;
  };

  public delete = async (id: number) => {
    const deletedAuhtor = await this.authorRepository.delete(id);

    if (!deletedAuhtor.affected) {
      throw new HttpException(404, `Author with id ${id} not found`);
    }
  };
}
