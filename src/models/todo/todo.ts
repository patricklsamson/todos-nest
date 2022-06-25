import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class Todo {
  @IsNumber()
  id: number;

  @IsString()
  body: string;

  @IsBoolean()
  done: boolean;
}
