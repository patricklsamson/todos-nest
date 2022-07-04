import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../models/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { TodoGqlDbService } from '../../services/todo/todoGqlDb.service';

@Resolver(() => Todo)
export class TodoDbResolver {
  constructor(private todoService: TodoGqlDbService) {}

  @Query(() => [Todo], { name: 'dbTodos' })
  findAllDbTodos(): Promise<Todo[]> {
    return this.todoService.findAllTodos();
  }

  @Query(() => Todo, { name: 'dbTodo' })
  findOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => Todo)
  createDbTodo(@Args('todo') todo: TodoRequest): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  updateDbTodo(@Args('todo') todo: TodoRequest): Promise<Todo> {
    return this.todoService.updateTodo(todo.id, todo);
  }

  @Mutation(() => Todo)
  removeAllDbTodos(): Promise<void> {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => Todo)
  removeOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeOneTodo(id);
  }
}
