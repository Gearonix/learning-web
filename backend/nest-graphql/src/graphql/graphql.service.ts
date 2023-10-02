import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from './roles.entity';
import { CreateRole } from './create-role.input';
import { FileUploadInput } from './file-upload';
import { createWriteStream } from 'fs';
import { join } from 'path';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload';

@Injectable()
export class GraphqlService {
  constructor(private prisma: PrismaService) {}

  getRoles(id: number) {
    const role = this.prisma.roles.findUnique({ where: { id: Number(id) } });
    if (!role) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
      return null;
    }
    return role;
  }
  createRole({ username, id }: CreateRole) {
    console.log('test');
    const newRole = this.prisma.roles.create({ data: { username, id } });
    console.log(newRole);
    return newRole;
  }
  async uploadFile(file: GraphQLUpload) {
    console.log('image');
    console.log(file);
    const { createReadStream, filename } = await file;
    try {
      const result = await createReadStream().pipe(
        createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
      );
      return this.getRoles(2);
      console.log(result);
    } catch (e) {
      throw new HttpException('File Upload error', HttpStatus.BAD_REQUEST);
    }
  }
}
