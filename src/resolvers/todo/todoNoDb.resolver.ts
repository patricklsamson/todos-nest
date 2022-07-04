import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../models/todo.entity';
import { TodoRequest } from '../../requests/todo.request';
import { TodoGqlNoDbService } from '../../services/todo/todoGqlNoDb.service';

@Resolver(() => Todo)
export class TodoNoDbResolver {
  constructor(private todoService: TodoGqlNoDbService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAllTodos(): Todo[] {
    return this.todoService.findAllTodos();
  }

  @Query(() => Todo, { name: 'todo' })
  findOneTodo(@Args('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('todo') todo: TodoRequest): Todo {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('id', ParseIntPipe) id: number, @Args('todo') todo: TodoRequest): Todo {
    return this.todoService.updateTodo(id, todo);
  }

  @Mutation(() => Todo)
  removeAllTodos(): void {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => Todo)
  removeOneTodo(@Args('id', ParseIntPipe) id: number): void {
    return this.todoService.removeOneTodo(id);
  }
}
