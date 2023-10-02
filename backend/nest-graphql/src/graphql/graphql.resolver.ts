import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { GraphqlService } from './graphql.service';
import { Role } from './roles.entity';
import { CreateRole } from './create-role.input';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUploadInput } from './file-upload';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Role)
export class GraphqlResolver {
  constructor(private graphqlService: GraphqlService) {}

  @Query((returns) => Role)
  async findRoles(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlService.getRoles(id);
  }

  @Mutation((returns) => Role)
  async createRole(@Args('body') roleBody: CreateRole): Promise<Role> {
    return this.graphqlService.createRole(roleBody);
  }

  @Mutation(() => Role)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: GraphQLUpload,
  ) {
    console.log(file);
    return await this.graphqlService.uploadFile(file);
  }

  @Subscription((returns) => Role, {
    name: 'commentAdded',
  })
  subscribeToCommentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
  @Mutation((returns) => Boolean)
  async sendMessage(@Args('test') test: string) {
    const role = await this.findRoles(2);
    pubSub.publish('commentAdded', { commentAdded: role });
    return true;
  }
}
