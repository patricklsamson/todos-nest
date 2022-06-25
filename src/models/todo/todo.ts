import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Todo {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
