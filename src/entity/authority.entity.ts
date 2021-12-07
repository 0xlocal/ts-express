import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("authority")
export class Authority {
  @PrimaryGeneratedColumn({ name: "authority_id" })
  id: number;

  @Column({ name: "authority_name" })
  authorityName: string;

  @ManyToMany(() => Role, (role) => role.authorities)
  roles: Role[];

  @RelationId((authority: Authority) => authority.roles)
  roleIds: number[];
}
