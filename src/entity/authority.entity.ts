import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import BasicEntity from "./basic.entity";
import Role from "./role.entity";

@Entity("authority")
export class Authority extends BasicEntity {
  @PrimaryGeneratedColumn({ name: "authority_id" })
  id: number;

  @Column({ name: "authority_name" })
  authorityName: string;

  @ManyToMany(() => Role, (role) => role.authorities)
  roles: Role[];

  @RelationId((authority: Authority) => authority.roles)
  roleIds: number[];
}

export default Authority;
