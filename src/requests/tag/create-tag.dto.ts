import { IsNumber, IsString } from "class-validator";

export class CreateTagDto {
  @IsString()
  name: string;

  @IsNumber()
  todoId: number;
}
