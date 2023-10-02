import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.model";
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create_user.dto";

@Injectable()
export class UsersService {
   constructor(
     @InjectRepository(User)
     private usersRepository: Repository<User>
   ) {}


  async getUsers(id : number): Promise<User>{
     return this.usersRepository.findOne({
       where: {
         id
       }
     });
  }
  async createUser({ txt, Adress }: CreateUserDto) : Promise<void> {
     await this.usersRepository.createQueryBuilder()
       .insert().into(User).values([
         {txt, Adress}
       ])
       .execute()
  }
  async getAllUsers() : Promise<User[]>{
     return this.usersRepository.find()
  }
  async deleteUser(id : number){
     await this.usersRepository.delete({
       id
     })
  }
  async updateUser(id : number){
     await this.usersRepository.update({
       id
     }, {Adress: 'w___w'})
  }


}
