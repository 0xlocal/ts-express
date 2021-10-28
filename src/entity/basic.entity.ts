import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicEntity {
  @CreateDateColumn({ name: "create_date" })
  createDate: Date;

  @Column({ name: "create_by" })
  createBy: string;

  @UpdateDateColumn({ name: "update_date" })
  updateDate: Date;

  @Column({ name: "update_by" })
  updateBy: string;
}

export default BasicEntity;
