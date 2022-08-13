import { PartialType } from "@nestjs/mapped-types";
import { CreateTodoInput } from "./create-todo.input";

export class UpdateTodoDto extends PartialType(CreateTodoInput) {}
