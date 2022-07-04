import { TodoEntity } from '../../models/todo/todo.entity';
import { TodoRequest } from '../../requests/todo.request';

export class TodoGqlNoDbService {
  public todos: TodoEntity[] = [];

  findAllTodos(): TodoEntity[] {
    return this.todos;
  }

  findOneTodo(id: number): TodoEntity {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: TodoRequest): TodoEntity {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  updateTodo(todoEntry: TodoRequest): TodoEntity|any {
    this.todos = this.todos.map(todo => {
      if (todo.id === todoEntry.id) {
        return { ...todoEntry };
      }

      return todo;
    });
  }

  removeAllTodos(): void {
    this.todos = [];
  }

  removeOneTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
