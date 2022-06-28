import { Field, InputType, ID } from '@nestjs/graphql';
import { TodoInput } from '../todo/todo.input';

@InputType()
export class TagInput {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => TodoInput)
  todo: TodoInput
}
