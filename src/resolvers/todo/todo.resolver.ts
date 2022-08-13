import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../models/todo/todo.entity';
import { TodoInput } from '../../requests/todo/todo.input';
import { TodoService } from '../../services/todo/todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAllTodos(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOneTodo(@Args('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('todo') todo: TodoInput): Todo {
    return this.todoService.create(todo);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id', ParseIntPipe) id: number,
    @Args('todo') todo: TodoInput
  ): Todo {
    return this.todoService.update(id, todo);
  }

  @Mutation(() => Boolean)
  removeAllTodos(): boolean {
    return this.todoService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneTodo(@Args('id', ParseIntPipe) id: number): boolean {
    return this.todoService.removeOne(id);
  }
}
