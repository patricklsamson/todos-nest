import { Injectable } from '@nestjs/common';
import { Todo } from '../../models/todo/todo.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { UpdateTodoInput } from '../../requests/todo/update-todo.input';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: CreateTodoInput): Todo {
    const newTodo: Todo = { id: this.todos.length + 1, ...todo };

    this.todos.push(newTodo);

    return newTodo;
  }

  update(id: number, todo: UpdateTodoDto|UpdateTodoInput): Todo {
    const updatedTodo: Todo = { id, ...todo };

    this.todos[this.todos.findIndex(todo => todo.id === id)] = updatedTodo;

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
