import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class TodoInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => Boolean, { nullable: true })
  done?: boolean;
}
