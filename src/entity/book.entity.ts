import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BasicEntity from "./basic.entity";
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

  //   @Column()
  //   categoryID: number;

  //   @Column()
  //   authorID: number;
}

export default Book;
