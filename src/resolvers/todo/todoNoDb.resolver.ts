import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoEntity } from '../../models/todo/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { TodoGqlNoDbService } from '../../services/todo/todoGqlNoDb.service';

@Resolver(() => TodoEntity)
export class TodoNoDbResolver {
  constructor(private todoService: TodoGqlNoDbService) {}

  @Query(() => [TodoEntity], { name: 'todos' })
  findAllTodos(): TodoEntity[] {
    return this.todoService.findAllTodos();
  }

  @Query(() => TodoEntity, { name: 'todo' })
  findOneTodo(@Args('id', ParseIntPipe) id: number): TodoEntity {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => TodoEntity)
  createTodo(@Args('todo') todo: TodoRequest): TodoEntity {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => TodoEntity)
  updateTodo(@Args('todo') todo: TodoRequest): TodoEntity {
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
}
