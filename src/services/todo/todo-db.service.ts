import { Injectable } from '@nestjs/common';
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoDto } from '../../requests/todo/create-todo.dto';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoDbService {
  constructor(private repositoryService: RepositoryService) {}

  findAll(): Promise<TodoDb[]> {
    return this.repositoryService.todoRepository.find({ relations: ['tags'] });
  }

  findOne(id: number): Promise<TodoDb> {
    return this.repositoryService.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  create(todo: CreateTodoDto): Promise<TodoDb> {
    const newTodo: CreateTodoDto = this.repositoryService.todoRepository.create(todo);

    return this.repositoryService.todoRepository.save(newTodo);
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoDb> {
    await this.repositoryService.todoRepository.update(id, todo);

    return this.repositoryService.todoRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const todos: TodoDb[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.delete(todo.id));
  }

  removeOne(id: number): void {
    this.repositoryService.todoRepository.delete(id);
  }
}
