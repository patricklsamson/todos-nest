import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TodoRequest {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => Boolean, { nullable: true })
  done?: boolean;
}
