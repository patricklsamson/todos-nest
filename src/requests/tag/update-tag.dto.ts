import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateTagDto {
  @IsString()
  @Length(5, 50)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  todoId?: number;
}
