import { Injectable } from '@nestjs/common';
import { TodoDto } from '../../models/todo/todo.dto';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TodoDto[]> {
    return this.repositoryService.todoRepository.find({ relations: ['tags'] });
  }

  findOne(id: number): Promise<TodoDto> {
    return this.repositoryService.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  create(todo: TodoDto): Promise<TodoDto> {
    const newTodo: TodoDto = this.repositoryService.todoRepository.create(todo);

    return this.repositoryService.todoRepository.save(newTodo);
  }

  async update(id: number, todo: TodoDto): Promise<TodoDto> {
    await this.repositoryService.todoRepository.update(id, todo);

    return this.repositoryService.todoRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const todos: TodoDto[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.delete(todo.id));
  }

  removeOne(id: number): void {
    this.repositoryService.todoRepository.delete(id);
  }
}
