import { Body, Controller, Get } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create_user.dto";




@Controller('auth')
export class AuthController {

  @Get('/')
  login(@Body() user: CreateUserDto){

  }
}
