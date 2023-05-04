import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./roles.model";
import { User } from 'src/users/users.model';
import { UserRole } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
   TypeOrmModule.forFeature([Role, User, UserRole])
  ]
})
export class RolesModule {}
