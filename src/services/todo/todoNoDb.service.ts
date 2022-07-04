import { Injectable } from '@nestjs/common';
import { TodoDto } from '../../models/todo/todo.dto';

@Injectable()
export class TodoNoDbService {
  public todos: TodoDto[] = [];

  findAll(): TodoDto[] {
    return this.todos;
  }

  findOne(id: number): TodoDto {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: TodoDto): TodoDto {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  update(id: number, todo: TodoDto): TodoDto {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updateTodo: TodoDto = {
      ...todo,
      id
    };

    this.todos[index] = updateTodo;

    return updateTodo;
  }

  removeAll(): void {
    this.todos = [];
  }

  removeOne(id: number): void {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    this.todos.splice(index, 1);
  }
}
