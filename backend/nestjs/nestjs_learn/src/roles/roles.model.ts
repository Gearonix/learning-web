import { Entity, Column, ManyToMany, JoinTable, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "../users/users.model";
import { UserRole } from "./user-roles.model";


@Entity('roles')
export class Role {
  @PrimaryColumn('int')
  id: number
  @Column('varchar')
  username: string

  @ManyToMany(() => User, () => UserRole)
  @JoinTable()
  users: User[]

}
