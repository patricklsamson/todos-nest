import { Todo } from '../../models/todo.entity';
import { TodoRequest } from '../../requests/todo.request';

export class TodoGqlNoDbService {
  public todos: Todo[] = [];

  findAllTodos(): Todo[] {
    return this.todos;
  }

  findOneTodo(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: TodoRequest): Todo {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  updateTodo(id: number, todo: TodoRequest): Todo {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updatedTodo: Todo = {
      ...todo,
      id
    };

    this.todos[index] = updatedTodo;

    return updatedTodo;
  }

  removeAllTodos(): void {
    this.todos = [];
  }

  removeOneTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
