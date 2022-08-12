import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength
} from "class-validator";

export class TodoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  body: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
