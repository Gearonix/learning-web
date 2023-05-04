import {Controller, Get} from '@nestjs/common'
import { MainService } from "./main.service";

@Controller('/api')
export class MainController{
  constructor(private mainService: MainService) {

  }


  @Get('/users')
  getUsers(){
    return this.mainService.getUsers()
  }
}
