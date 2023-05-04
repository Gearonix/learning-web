import { Entity, Column, ManyToMany, JoinTable, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "../users/users.model";



@Entity('user_roles')
export class UserRole {
  @PrimaryColumn('int')
  id: number
  @ManyToOne(() => User, user => user.txt)
  user: User
}

