import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TodoRequest {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  body?: string;

  @Field(() => Boolean)
  done?: boolean;
}
