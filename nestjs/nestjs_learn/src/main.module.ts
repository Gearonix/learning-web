import { Module } from "@nestjs/common";
import { MainController } from "./main.controller";
import { MainService } from "./main.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRole } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ControllerModule } from './controller/controller.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_NAME,
      port: +process.env.DB_PORT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Role, UserRole],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ControllerModule,
  ],
})
export class MainModule {

}
