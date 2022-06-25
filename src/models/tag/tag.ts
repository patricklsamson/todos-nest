import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TodoEntity } from '../todo/todo.entity';

export class Tag {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  todo: TodoEntity
}
