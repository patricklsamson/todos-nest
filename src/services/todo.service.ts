import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDto } from '../models/todo/todo.dto';
import { TodoEntity } from '../models/todo/todo.entity';
import { TodoInput } from '../models/todo/todo.input';

@Injectable()
export class TodoService {
  public todos: TodoDto[] = [];
  public gqlTodos: TodoEntity[] = [];

  constructor(
    @InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>
  ) {}

  findAll(): TodoDto[] {
    return this.todos;
  }

  findAllTodos(): TodoEntity[] {
    return this.gqlTodos;
  }

  findAllEnts(): Promise<TodoDto[]> {
    return this.todoRepository.find({ relations: ['tags'] });
  }

  findAllTodoEnts(): Promise<TodoEntity[]> {
    return this.todoRepository.find({ relations: ['tags'] })
  }

  findOne(id: number): TodoDto {
    return this.todos.find(todo => todo.id === id);
  }

  findOneTodo(id: number): TodoEntity {
    return this.gqlTodos.find(todo => todo.id === id);
  }

  findOneEnt(id: number): Promise<TodoDto> {
    return this.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  findOneTodoEnt(id: number): Promise<TodoEntity> {
    return this.todoRepository.findOne({
      where: { id: id },
      relations: ['tags']
    });
  }

  create(todo: TodoDto): TodoDto {
    this.todos = [
      ...this.todos,
      { id: this.todos.length + 1, ...todo }
    ];

    return todo;
  }

  createTodo(todo: TodoInput): TodoEntity {
    this.gqlTodos = [
      ...this.gqlTodos,
      { id: this.gqlTodos.length + 1, ...todo }
    ];

    return todo;
  }

  createEnt(todo: TodoDto): Promise<TodoDto> {
    const newTodo: TodoDto = this.todoRepository.create(todo);

    return this.todoRepository.save(newTodo);
  }

  createTodoEnt(todo: TodoInput): Promise<TodoEntity> {
    const newTodo: TodoInput = this.todoRepository.create(todo);

    return this.todoRepository.save(newTodo);
  }

  update(id: number, todo: TodoDto): TodoDto {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    const updateTodo: TodoDto = {
      ...todo,
      id
    };

    this.todos[index] = updateTodo;

    return updateTodo;
  }

  updateTodo(updateTodo: TodoEntity): TodoEntity|any {
    this.gqlTodos = this.gqlTodos.map(todo => {
      if (todo.id === updateTodo.id) {
        return { ...updateTodo };
      }

      return todo;
    });
  }

  async updateEnt(id: number, todo: TodoDto): Promise<TodoDto> {
    await this.todoRepository.update(id, todo);

    return this.todoRepository.findOneBy({ id: id });
  }

  async updateTodoEnt(id: number, todo: TodoInput): Promise<TodoEntity> {
    await this.todoRepository.preload({
      id: id,
      ...todo
    });

    return this.todoRepository.save(todo);
  }

  removeAll(): void {
    this.todos = [];
  }

  removeAllTodos(): void {
    this.gqlTodos = [];
  }

  async removeAllEnts(): Promise<void> {
    const todos: TodoDto[] = await this.todoRepository.find();

    todos.forEach(todo => this.todoRepository.delete(todo.id));
  }

  async removeAllTodoEnts(): Promise<void> {
    const todos: TodoEntity[] = await this.todoRepository.find();

    todos.forEach(todo => this.todoRepository.remove(todo));
  }

  removeOne(id: number): void {
    const index: number = this.todos.findIndex(todo => todo.id === id);

    this.todos.splice(index, 1);
  }

  removeOneTodo(id: number): void {
    this.gqlTodos = this.gqlTodos.filter(todo => todo.id !== id);
  }

  removeOneEnt(id: number): void {
    this.todoRepository.delete(id);
  }

  async removeOneTodoEnt(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id: id }
    });

    this.todoRepository.remove(todo);
  }
}
