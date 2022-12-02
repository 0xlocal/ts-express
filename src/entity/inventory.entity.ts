import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("inventory")
export class InventoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "inventory_id" })
  id: number;

  @Column({ name: "book_id" })
  bookId: number;

  @Column({ name: "qty_available" })
  qtyAvailable: number;

  @Column({ name: "qty_on_borrow" })
  qtyOnBorrow: number;
}
