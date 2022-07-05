import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  body: string;

  @Field()
  done: boolean;
}
