import { EntityRepository, Repository } from "typeorm";
import { BookDetail } from "../entity/book-detail.entity";

@EntityRepository(BookDetail)
export class BookDetailRepository extends Repository<BookDetail> {}
