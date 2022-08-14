import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { UpdateTodoInput } from '../../requests/todo/update-todo.input';
import { TodoSerializer } from '../../serializers/todo.serializer';
import { RepositoryService } from '../repository.service';

@Injectable()
export class TodoDbService {
  constructor(private repositoryService: RepositoryService) {}

  async findAll(): Promise<TodoDb[]> {
    return TodoSerializer.serialize(
      await this.repositoryService.todoRepository.find({ relations: ['tags'] })
    );
  }

  async findOne(id: number): Promise<TodoDb> {
    try {
      const todo: TodoDb =
        await this.repositoryService.todoRepository.findOneOrFail({
          where: { id: id },
          relations: ['tags']
        });

      return TodoSerializer.serialize(todo);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(todo: CreateTodoInput): Promise<TodoDb> {
    const newTodo: CreateTodoInput =
      this.repositoryService.todoRepository.create(todo);

    return TodoSerializer.serialize(
      await this.repositoryService.todoRepository.save(newTodo)
    );
  }

  async update(
    id: number,
    todo: UpdateTodoDto|UpdateTodoInput
  ): Promise<TodoDb> {
    try {
      await this.repositoryService.todoRepository.update(id, todo);

      return TodoSerializer.serialize(
        await this.repositoryService.todoRepository.findOneByOrFail({ id: id })
      );
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeAll(): Promise<object> {
    const todos: TodoDb[] = await this.repositoryService.todoRepository.find();

    todos.forEach(todo => this.repositoryService.todoRepository.remove(todo));

    return {
      data: {
        attributes: {
          success: true
        }
      }
    };
  }

  async removeOne(id: number): Promise<object> {
    try {
      const todo: TodoDb =
        await this.repositoryService.todoRepository.findOneByOrFail({ id: id });

      this.repositoryService.todoRepository.remove(todo);

      return {
        data: {
          attributes: {
            success: true
          }
        }
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
