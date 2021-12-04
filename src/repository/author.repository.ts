import { EntityRepository, Repository } from "typeorm";
import { Author } from "../entity/author.entity";

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}
