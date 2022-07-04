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

  updateTodo(todoEntry: TodoRequest): Todo|any {
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
