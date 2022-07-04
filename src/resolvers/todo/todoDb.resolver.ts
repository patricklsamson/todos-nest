import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoEntity } from '../../models/todo/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { TodoGqlDbService } from '../../services/todo/todoGqlDb.service';

@Resolver(() => TodoEntity)
export class TodoDbResolver {
  constructor(private todoService: TodoGqlDbService) {}

  @Query(() => [TodoEntity], { name: 'dbTodos' })
  findAllDbTodos(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();
  }

  @Query(() => TodoEntity, { name: 'dbTodo' })
  findOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => TodoEntity)
  createDbTodo(@Args('todo') todo: TodoRequest): Promise<TodoEntity> {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => TodoEntity)
  updateDbTodo(@Args('todo') todo: TodoRequest): Promise<TodoEntity> {
    return this.todoService.updateTodo(todo.id, todo);
  }

  @Mutation(() => TodoEntity)
  removeAllDbTodos(): Promise<void> {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => TodoEntity)
  removeOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeOneTodo(id);
  }
}
