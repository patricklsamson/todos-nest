import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoEntity } from '../models/todo/todo.entity';
import { TodoInput } from '../models/todo/todo.input';
import { TodoService } from '../services/todo.service';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoEntity], { name: 'todos' })
  findAllTodos(): TodoEntity[] {
    return this.todoService.findAllTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  findOneTodo(@Args('id', ParseIntPipe) id: number): TodoEntity {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => TodoEntity)
  createTodo(@Args('todo') todo: TodoInput): TodoEntity {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => TodoEntity)
  updateTodo(@Args('todo') todo: TodoInput): TodoEntity {
    return this.todoService.updateTodo(todo);
  }

  @Mutation(() => TodoEntity)
  removeAllTodos(): void {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => TodoEntity)
  removeOneTodo(@Args('id', ParseIntPipe) id: number): void {
    return this.todoService.removeOneTodo(id);
  }

  @Query(() => [TodoEntity], { name: 'todoEnts' })
  findAllTodoEnts(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodoEnts();
  }

  @Query(() => TodoEntity, { name: 'todoEnt' })
  findOneTodoEnt(@Args('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.findOneTodoEnt(id);
  }

  @Mutation(() => TodoEntity)
  createTodoEnt(@Args('todo') todo: TodoInput): Promise<TodoEntity> {
    return this.todoService.createTodoEnt(todo);
  }

  @Mutation(() => TodoEntity)
  updateTodoEnt(@Args('todo') todo: TodoInput): Promise<TodoEntity> {
    return this.todoService.updateTodoEnt(todo.id, todo);
  }

  @Mutation(() => TodoEntity)
  removeAllTodoEnts(): Promise<void> {
    return this.todoService.removeAllTodoEnts();
  }

  @Mutation(() => TodoEntity)
  removeOneTodoEnt(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeOneTodoEnt(id);
  }
}
