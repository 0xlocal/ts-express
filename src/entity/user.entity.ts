import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import BasicEntity from "./basic.entity";
import Role from "./role.entity";

@Entity("user")
export class User extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "identity_num" })
  identityNum: string;

  @Column({ name: "date_of_birth", type: "date" })
  dob: Date;

  @Column({ name: "place_of_birth" })
  pob: string;

  @Column()
  phone: string;

  @Column({ name: "role_id" })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: Role;

  @DeleteDateColumn()
  deleteDate: Date;
  // @Column("boolean", { name: "f_delete", default: false })
  // isDelete: boolean;
}

export default User;
