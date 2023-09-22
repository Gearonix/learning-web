import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
   @ApiProperty({example: 'txt_emaple', description: 'txt_descipriton'})
   readonly txt: number;
   readonly Adress: string;
}
