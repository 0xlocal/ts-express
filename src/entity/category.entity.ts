import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("category")
export class Category extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;
}
