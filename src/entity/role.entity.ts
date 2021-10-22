import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Authority } from "./authority.entity";
import { BasicEntity } from "./basic.entity";

@Entity("role")
export class Role extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "role_id" })
  id: number;

  @Column({ name: "role_name" })
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Authority, (authority) => authority.roles)
  @JoinTable({
    name: "role_authority",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "authority_id",
      referencedColumnName: "id",
    },
  })
  authorities: Authority[];
}
