import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";




@Entity('talbe1')
export class User{
  @ApiProperty({example: '10', description: 'unique_title'})
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('tinyint', {default: true})
  txt: number
  @Column()
  Adress: string
}
