import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ description: 'test' })
export class Role {
  @Field(() => ID)
  id: number;
  @Field()
  username: string;
}
