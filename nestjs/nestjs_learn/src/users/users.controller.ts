import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create_user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";

@ApiTags('api_tag')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'api_operation'})
  @ApiResponse({status: 200, type: User})
  @Get('/get')
  async getUsers(@Query() { id } : {id : string}){
    const data = await this.usersService.getUsers(+id)
    return {
      ok: 200,
      data
    }
  }

  @Get('/get/all')
  async getAllUsers(){
    const data = await this.usersService.getAllUsers()
    return {
      ok: 200,
      data
    }
  }

  @Post('/create')
  async createUser(@Body() userDto: CreateUserDto){
    await this.usersService.createUser(userDto)
    return {
      ok: 200,
      data: {}
    }
  }
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string ){
    await this.usersService.deleteUser(+id)
    return {
      ok: 200,
      data: {}
    }
  }
  @Put('/update/:id')
  async updateUser(@Param('id') id: string){
    await this.usersService.updateUser(+id)
    return {
      ok: 200,
      data: {}
    }
  }

}
