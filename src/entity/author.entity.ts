import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Book } from "./book.entity";

@Entity("author")
export class Author extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "author_id" })
  id: number;

  @Column({ name: "author_name", unique: true })
  authorName: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
