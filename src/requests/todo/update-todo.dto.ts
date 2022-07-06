import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNumber()
  id: number;
}
