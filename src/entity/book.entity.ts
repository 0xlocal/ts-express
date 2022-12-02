import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Author } from "./author.entity";
import { BookDetail } from "./book-detail.entity";
import { BasicEntity } from "./basic.entity";
@Entity("book")
export class Book extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "book_id" })
  id: number;

  @Column()
  sku: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  year: number;

  @Column()
  image: string;

  @Column()
  quantity: number;

  @Column({ name: "category_id" })
  categoryId: number;

  @Column({ name: "author_id" })
  authorId: number;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category: Category;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author: Author;

  @OneToMany(() => BookDetail, (bookDetail) => bookDetail.book)
  bookDetails: BookDetail[];

  @DeleteDateColumn()
  deleteDate: Date;
  // @Column("boolean", { name: "f_delete", default: false })
  // isDelete: boolean;
}
