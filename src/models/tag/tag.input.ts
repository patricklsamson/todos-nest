import { Field, ID, InputType } from '@nestjs/graphql';
import { TodoInput } from '../todo/todo.input';

@InputType()
export class TagInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => TodoInput, { nullable: true })
  todo?: TodoInput;
}
