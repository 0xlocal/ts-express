import { BookRepository } from "../repository/book.repository";
import { Connection, getConnection } from "typeorm";
import { Book } from "../entity/book.entity";
import HttpException from "../exception/http.exception";
import { BookDetailRepository } from "../repository/book-detail.repository";
import { BookDetail } from "../entity/book-detail.entity";

export class BookService {
  private readonly bookRepository: BookRepository;
  private readonly bookDetailRepository: BookDetailRepository;
  // private readonly connection: Connection;

  constructor() {
    // this.connection = getConnection();
    this.bookRepository = getConnection().getCustomRepository(BookRepository);
    this.bookDetailRepository =
      getConnection().getCustomRepository(BookDetailRepository);
  }

  public index = async () => {
    const books = await this.bookRepository.find();

    return books;
  };

  public getOne = async (id: number) => {
    const book = await this.bookRepository.findOne(id);

    return book;
  };

  public create = async (book: Book) => {
    const newBook = this.bookRepository.create(book);
    const newBookDetail = this.generateDetail(book.quantity, book.sku, 4);

    newBook.bookDetails = newBookDetail;

    const result = await this.bookRepository.save(newBook);

    return result;
  };

  public update = async (book: Book, id: number) => {
    const oldBook = await this.bookRepository.findOne(book.id);
    const [bookDetails, bookDetailsCount] =
      await this.bookDetailRepository.findAndCount({ bookId: book.id });

    if (oldBook) {
      if (book.quantity > oldBook.quantity) {
        // * new quantity more than old (added more book quantity)
        const newBookDetail = this.generateDetail(
          book.quantity - oldBook.quantity,
          book.sku,
          4,
          bookDetailsCount
        );

        book.bookDetails = [...bookDetails, ...newBookDetail];
      } else if (book.quantity < oldBook.quantity) {
        // * new quantity less than old (removed some book quantity)
        bookDetails.sort((a, b) => a.id - b.id);
        const bookDetailsFiltered = bookDetails.splice(
          bookDetails.length - (oldBook.quantity - book.quantity),
          oldBook.quantity - book.quantity
        );

        book.bookDetails = bookDetailsFiltered;
      }
    }

    const updateBook = await this.bookRepository.save(book);

    return updateBook;
  };

  public delete = async (id: number) => {
    const deletedBook = await this.bookRepository.softDelete(id);

    if (!deletedBook.affected) {
      throw new HttpException(404, `Book with id ${id} not found`);
    }
  };

  /**
   * * quantity represent how many books we have on library
   * * sku is serial number for the books number
   * * and sequence is how many zero after sku for serial number
   */
  private generateDetail(
    quantity: number,
    sku: string,
    sequence: number,
    startFrom?: number
  ): BookDetail[] {
    const bookDetails: BookDetail[] = [];

    for (let i = 1; i <= quantity; i++) {
      let bookDetail = new BookDetail();
      bookDetail.bookNumber = sku
        .concat("0".repeat(sequence))
        .concat(i.toString());

      bookDetails.push(bookDetail);
    }

    return bookDetails;
  }
}
