import { Injectable } from "@nestjs/common";


@Injectable()
export class MainService{
  getUsers(){
    return [{name: 'test'}]
  }
}
