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
    return this.todoService.findAll();
  }

  @Query(() => TodoDb, { name: 'dbTodo' })
  findOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<TodoDb> {
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoDb)
  createDbTodo(@Args('todo') todo: CreateTodoInput): Promise<TodoDb> {
    return this.todoService.create(todo);
  }

  @Mutation(() => TodoDb)
  updateDbTodo(@Args('todo') todo: UpdateTodoInput): Promise<TodoDb> {
    return this.todoService.update(todo.id, todo);
  }

  @Mutation(() => Boolean)
  removeAllDbTodos(): Promise<boolean> {
    return this.todoService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneDbTodo(@Args('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.todoService.removeOne(id);
  }
}
