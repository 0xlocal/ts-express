import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicEntity {
  @CreateDateColumn({ name: "create_date" })
  createDate: Date;

  @Column({ name: "create_by", default: "SYSTEM" })
  createBy: string;

  @UpdateDateColumn({ name: "update_date", nullable: true })
  updateDate: Date;

  @Column({ name: "update_by", nullable: true })
  updateBy: string;
}

export default BasicEntity;
