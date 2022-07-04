import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TodoRequest {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String)
  body?: string;

  @Field(() => Boolean)
  done?: boolean;
}
