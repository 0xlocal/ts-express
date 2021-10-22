import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("category")
export class Category extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "category_id" })
  id: number;

  @Column({ name: "category_name" })
  categoryName: string;
}
