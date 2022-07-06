import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTodoInput } from "./create-todo.input";

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
