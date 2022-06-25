import { Injectable } from '@nestjs/common';
import { Todo } from 'src/models/todo/todo';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number) {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: Todo): Todo {
    this.todos.push(todo);

    return todo;
  }

  update(id: number, todo: Todo): Todo {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updateTodo: Todo = {
      ...todo,
      id
    };

    this.todos[index] = updateTodo;

    return updateTodo;
  }

  remove(id: number) {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    this.todos.splice(index, 1);
  }
}
