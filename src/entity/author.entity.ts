import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BasicEntity from "./basic.entity";

@Entity("author")
export class Author extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "author_id" })
  id: number;

  @Column({ name: "author_name" })
  authorName: string;
}
