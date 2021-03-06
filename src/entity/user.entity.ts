import {
  Column,
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

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: Role;
}

export default User;
