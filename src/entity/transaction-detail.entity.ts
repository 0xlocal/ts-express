import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("transaction_detail")
export class TransactionDetailEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "transaction_detail_id" })
  id: number;

  @Column({ name: "transaction_id" })
  transactionId: number;

  @Column({ name: "book_detail_id" })
  bookDetailId: number;
}
