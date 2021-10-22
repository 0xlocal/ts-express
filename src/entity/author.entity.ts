import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("author")
export class Author extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string;
}
