import { Injectable } from "@nestjs/common";
import { Todo } from '../../models/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoGqlDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAllTodos(): Promise<Todo[]> {
    return this.repositoryService.todoRepository.find({ relations: ['tags'] })
  }

  findOneTodo(id: number): Promise<Todo> {
    return this.repositoryService.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  createTodo(todo: TodoRequest): Promise<Todo> {
    const newTodo: TodoRequest = this.repositoryService.todoRepository.create(todo);

    return this.repositoryService.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, todo: TodoRequest): Promise<Todo> {
    await this.repositoryService.todoRepository.preload({
      id: id,
      ...todo
    });

    return this.repositoryService.todoRepository.save(todo);
  }

  async removeAllTodos(): Promise<void> {
    const todos: Todo[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.remove(todo));
  }

  async removeOneTodo(id: number): Promise<void> {
    const todo: Todo = await this.repositoryService.todoRepository.findOneBy({ id: id });

    this.repositoryService.todoRepository.remove(todo);
  }
}
