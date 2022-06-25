import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../models/todo/todo';
import { TodoEntity } from '../models/todo/todo.entity';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  constructor(
    @InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: ['tags'] });
  }

  findAllDtos(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  findOneDto(id: number): Todo {
    return this.todos.find(todoDto => todoDto.id === id);
  }

  create(todo: Todo): Promise<Todo> {
    const newTodo: Todo = this.todoRepository.create(todo);

    return this.todoRepository.save(newTodo);
  }

  createDto(todoDto: Todo): Todo {
    this.todos.push(todoDto);

    return todoDto;
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, todo);

    return this.todoRepository.findOneBy({ id: id });
  }

  updateDto(id: number, todo: Todo): Todo {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updateTodo: Todo = {
      ...todo,
      id
    };

    this.todos[index] = updateTodo;

    return updateTodo;
  }

  async removeAll(): Promise<void> {
    const todos: Todo[] = await this.todoRepository.find();

    todos.forEach(todo => this.todoRepository.delete(todo.id));
  }

  remove(id: number): void {
    this.todoRepository.delete(id);
  }

  removeDto(id: number): void {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    this.todos.splice(index, 1);
  }
}
