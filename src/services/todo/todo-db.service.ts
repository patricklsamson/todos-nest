import { Injectable } from '@nestjs/common';
import { TodoDb } from '../../models/todo/todo-db.entity';
import { IndexRepository } from '../../repositories/index.repository';
import { CreateTodoDto } from '../../requests/todo/create-todo.dto';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';

@Injectable()
export class TodoDbService {
  constructor(private repositoryIndex: IndexRepository) {}

  findAll(): Promise<TodoDb[]> {
    return this.repositoryIndex.todoRepository.find({ relations: ['tags'] });
  }

  findOne(id: number): Promise<TodoDb> {
    return this.repositoryIndex.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  create(todo: CreateTodoDto): Promise<TodoDb> {
    const newTodo: CreateTodoDto = this.repositoryIndex.todoRepository.create(todo);

    return this.repositoryIndex.todoRepository.save(newTodo);
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoDb> {
    await this.repositoryIndex.todoRepository.update(id, todo);

    return this.repositoryIndex.todoRepository.findOneBy({ id: id });
  }

  async removeAll(): Promise<void> {
    const todos: TodoDb[] = await this.repositoryIndex.todoRepository.find();

    todos.forEach(todo => this.repositoryIndex.todoRepository.delete(todo.id));
  }

  removeOne(id: number): void {
    this.repositoryIndex.todoRepository.delete(id);
  }
}
