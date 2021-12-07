import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";
import { Book } from "./book.entity";

@Entity("category")
export class Category extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "category_id" })
  id: number;

  @Column({ name: "category_name" })
  categoryName: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
