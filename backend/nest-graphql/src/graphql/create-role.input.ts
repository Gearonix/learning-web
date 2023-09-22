import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRole {
  @Field()
  username: string;
  @Field(() => Int)
  id: number;
}
