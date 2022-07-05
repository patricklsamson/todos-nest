import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoInput } from '../../requests/todo/update-todo.input';
import { TodoGqlDbService } from '../../services/todo/todo-gql-db.service';

@Resolver(() => TodoDb)
export class TodoDbResolver {
  constructor(private todoService: TodoGqlDbService) {}

  @Query(() => [TodoDb], { name: 'dbTodos' })
  findAllDbTodos(): Promise<TodoDb[]> {
    return this.todoService.findAllTodos();
  }

  @Query(() => TodoDb, { name: 'dbTodo' })
  findOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<TodoDb> {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => TodoDb)
  createDbTodo(@Args('todo') todo: CreateTodoInput): Promise<TodoDb> {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => TodoDb)
  updateDbTodo(@Args('todo') todo: UpdateTodoInput): Promise<TodoDb> {
    return this.todoService.updateTodo(todo.id, todo);
  }

  @Mutation(() => TodoDb)
  removeAllDbTodos(): Promise<void> {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => TodoDb)
  removeOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeOneTodo(id);
  }
}
