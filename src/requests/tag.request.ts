import { Field, ID, InputType } from '@nestjs/graphql';
import { TodoRequest } from './todo.request';

@InputType()
export class TagRequest {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => TodoRequest)
  todo?: TodoRequest;
}
