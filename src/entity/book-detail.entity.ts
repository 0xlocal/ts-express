import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Book } from "./book.entity";

@Entity("book_detail")
export class BookDetail extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "book_detail_id" })
  id: number;

  @Column({ name: "book_id" })
  bookId: number;

  @ManyToOne(() => Book, (book) => book.bookDetails)
  @JoinColumn({ name: "book_id", referencedColumnName: "id" })
  book: Book;

  @Column({ name: "book_number" })
  bookNumber: string;

  // @Column({ name: "is_borrow" })
  // isBorrow: boolean;

  @DeleteDateColumn()
  deleteDate: Date;
}
