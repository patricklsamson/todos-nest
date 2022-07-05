import { IsBoolean, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  body: string;

  @IsBoolean()
  done: boolean;
}
