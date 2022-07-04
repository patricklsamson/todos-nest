import { Injectable } from '@nestjs/common';
import { Todo } from '../../models/todo.entity';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<Todo[]> {
    return this.repositoryService.todoRepository.find({ relations: ['tags'] });
  }

  findOne(id: number): Promise<Todo> {
    return this.repositoryService.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  create(todo: Todo): Promise<Todo> {
    const newTodo: Todo = this.repositoryService.todoRepository.create(todo);

    return this.repositoryService.todoRepository.save(newTodo);
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    await this.repositoryService.todoRepository.update(id, todo);

    return this.repositoryService.todoRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const todos: Todo[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.delete(todo.id));
  }

  removeOne(id: number): void {
    this.repositoryService.todoRepository.delete(id);
  }
}
