import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("inventory_detail")
export class InventoryDetailEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "inventory_detail_id" })
  id: number;

  @Column({ name: "inventory_id" })
  inventoryId: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "book_detail_id" })
  bookDetailId: number;
}
