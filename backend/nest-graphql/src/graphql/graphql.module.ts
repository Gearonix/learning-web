import { Module } from '@nestjs/common';
import { GraphqlController } from './graphql.controller';
import { GraphqlService } from './graphql.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GraphqlResolver } from './graphql.resolver';

@Module({
  controllers: [GraphqlController],
  providers: [GraphqlService, GraphqlResolver],
  imports: [PrismaModule],
})
export class GraphqlModule {}
