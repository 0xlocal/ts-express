import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("inventory_history")
export class InventoryHistoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "inventory_history_id" })
  id: number;

  @Column({ name: "inventory_detail_id" })
  inventoryDetailId: number;

  @Column({ name: "inventory_id" })
  inventoryId: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "book_detail_id" })
  bookDetailId: number;
}
