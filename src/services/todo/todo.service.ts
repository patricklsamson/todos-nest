import { Injectable } from '@nestjs/common';
import { Todo } from '../../models/todo/todo.entity';
import { TodoDto } from '../../requests/todo/todo.dto';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: TodoDto): Todo {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  update(id: number, todo: TodoDto): Todo {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updatedTodo: TodoDto = {
      id,
      ...todo
    };

    this.todos[index] = updatedTodo;

    return updatedTodo;
  }

  removeAll(): void {
    this.todos = [];
  }

  removeOne(id: number): void {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    this.todos.splice(index, 1);
  }
}
