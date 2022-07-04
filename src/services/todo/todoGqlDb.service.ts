import { Injectable } from "@nestjs/common";
import { TodoEntity } from '../../models/todo/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoGqlDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAllTodos(): Promise<TodoEntity[]> {
    return this.repositoryService.todoRepository.find({ relations: ['tags'] })
  }

  findOneTodo(id: number): Promise<TodoEntity> {
    return this.repositoryService.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  createTodo(todo: TodoRequest): Promise<TodoEntity> {
    const newTodo: TodoRequest = this.repositoryService.todoRepository.create(todo);

    return this.repositoryService.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, todo: TodoRequest): Promise<TodoEntity> {
    await this.repositoryService.todoRepository.preload({
      id: id,
      ...todo
    });

    return this.repositoryService.todoRepository.save(todo);
  }

  async removeAllTodos(): Promise<void> {
    const todos: TodoEntity[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.remove(todo));
  }

  async removeOneTodo(id: number): Promise<void> {
    const todo: TodoEntity = await this.repositoryService.todoRepository.findOneBy({ id: id });

    this.repositoryService.todoRepository.remove(todo);
  }
}
