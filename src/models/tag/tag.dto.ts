import { IsNumber, IsString } from 'class-validator';
import { TodoEntity } from '../todo/todo.entity';

export class TagDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  todo?: TodoEntity
}
