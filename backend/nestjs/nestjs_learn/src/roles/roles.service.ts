import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from './roles.model';
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role)
  private roleRepo: Repository<Role>) {

  }


  async getRoles(){
    return this.roleRepo.find({
      relations: {
        users: true,
      },
    })
  }
}
