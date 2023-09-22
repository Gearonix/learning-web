import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create_user.dto";

@Injectable()
export class AuthService {
  constructor(private userService, private jwtService) {

  }
  async login(user: CreateUserDto){

  }


}
