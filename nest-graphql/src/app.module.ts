import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<any>({
      driver: ApolloDriver,
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: 'http://localhost:3000',
      },
      // @ts-ignore
      uploads: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            // @ts-ignore
            error?.extensions?.exception?.response?.message || error?.message,
        };
        console.log(error);
        return graphQLFormattedError;
      },
    }),
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
