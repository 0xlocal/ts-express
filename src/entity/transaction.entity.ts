import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity("transaction")
export class TransactionEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "transaction_id" })
  id: number;

  @Column({ name: "transaction_no" })
  transactionNumber: string;

  @Column({ name: "transaction_type" })
  transactionType: string;

  @Column({ name: "transaction_date" })
  transactionDate: Date;

  @Column({ name: "user_id" })
  userId: number;

  @Column()
  quantity: number;

  @Column({ name: "borrow_start_date" })
  borrowStartDate: Date;

  @Column({ name: "borrow_end_date" })
  borrowEndDate: Date;
}
