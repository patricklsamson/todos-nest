import { Injectable } from '@nestjs/common';
import { Todo } from '../../models/todo/todo.entity';
import { TodoInput } from '../../requests/todo/todo.input';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: TodoInput): Todo {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  update(id: number, todo: TodoInput): Todo {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updatedTodo: TodoInput = {
      id,
      ...todo
    };

    this.todos[index] = updatedTodo;

    return updatedTodo;
  }

  removeAll(): boolean {
    this.todos = [];

    return true;
  }

  removeOne(id: number): boolean {
    this.todos = this.todos.filter(todo => todo.id !== id);

    return true;
  }
}
