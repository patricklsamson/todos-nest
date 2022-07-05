import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateTodoInput } from "./create-todo.input";

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;
}