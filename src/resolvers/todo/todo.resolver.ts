import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../models/todo/todo.entity';
import { TodoInput } from '../../requests/todo/todo.input';
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
  createTodo(@Args('todo') todo: TodoInput): Todo {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('id', ParseIntPipe) id: number, @Args('todo') todo: TodoInput): Todo {
    return this.todoService.updateTodo(id, todo);
  }

  @Mutation(() => Boolean)
  removeAllTodos(): boolean {
    return this.todoService.removeAllTodos();
  }

  @Mutation(() => Boolean)
  removeOneTodo(@Args('id', ParseIntPipe) id: number): boolean {
    return this.todoService.removeOneTodo(id);
  }
}
