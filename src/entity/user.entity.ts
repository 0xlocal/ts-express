import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { BasicEntity } from "./basic.entity";

@Entity("user")
export class User extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "identity_num" })
  identityNum: number;

  @Column({ type: "date" })
  bod: string;

  @Column()
  pod: string;

  @Column()
  phone: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
