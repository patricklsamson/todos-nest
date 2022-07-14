import { Injectable } from "@nestjs/common";
import { TodoDb } from '../../models/todo/todo-db.entity';
import { IndexRepository } from "../../repositories/index.repository";
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoInput } from "../../requests/todo/update-todo.input";

@Injectable()
export class TodoGqlDbService {
  constructor(private repositoryIndex: IndexRepository) {}

  findAllTodos(): Promise<TodoDb[]> {
    return this.repositoryIndex.todoRepository.find({ relations: ['tags'] })
  }

  findOneTodo(id: number): Promise<TodoDb> {
    return this.repositoryIndex.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  createTodo(todo: CreateTodoInput): Promise<TodoDb> {
    const newTodo: CreateTodoInput = this.repositoryIndex.todoRepository.create(todo);

    return this.repositoryIndex.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, todo: UpdateTodoInput): Promise<TodoDb> {
    await this.repositoryIndex.todoRepository.update(id, todo);

    return this.repositoryIndex.todoRepository.findOneBy({ id: id });
  }

  async removeAllTodos(): Promise<boolean> {
    const todos: TodoDb[] = await this.repositoryIndex.todoRepository.find();

    todos.forEach(todo => this.repositoryIndex.todoRepository.remove(todo));

    return true;
  }

  async removeOneTodo(id: number): Promise<boolean> {
    const todo: TodoDb = await this.repositoryIndex.todoRepository.findOneBy({ id: id });

    this.repositoryIndex.todoRepository.remove(todo);

    return true;
  }
}
