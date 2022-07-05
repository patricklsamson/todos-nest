import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../models/todo/todo.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoInput } from '../../requests/todo/update-todo.input';
import { TodoGqlService } from '../../services/todo/todo-gql.service';

@Resolver(() => Todo)
export class TodoNoDbResolver {
  constructor(private todoService: TodoGqlService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAllTodos(): Todo[] {
    return this.todoService.findAllTodos();
  }

  @Query(() => Todo, { name: 'todo' })
  findOneTodo(@Args('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOneTodo(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('todo') todo: CreateTodoInput): Todo {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('id', ParseIntPipe) id: number, @Args('todo') todo: UpdateTodoInput): Todo {
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
