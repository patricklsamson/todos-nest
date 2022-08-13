import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-errors';
import { Todo } from '../../models/todo/todo.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoInput } from '../../requests/todo/update-todo.input';
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
    const todo: Todo = this.todoService.findOne(id);

    if (!todo) throw new UserInputError('Invalid argument');

    return todo;
  }

  @Mutation(() => Todo)
  createTodo(@Args('todo') todo: CreateTodoInput): Todo {
    return this.todoService.create(todo);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('todo') todo: UpdateTodoInput): Todo|boolean {
    const updatedTodo: Todo|boolean = this.todoService.update(todo.id, todo);

    if (!updatedTodo) throw new UserInputError('Invalid argument');

    return updatedTodo;
  }

  @Mutation(() => Boolean)
  removeAllTodos(): boolean {
    return this.todoService.removeAll();
  }

  @Mutation(() => Boolean)
  removeOneTodo(@Args('id', ParseIntPipe) id: number): boolean {
    const success: boolean = this.todoService.removeOne(id);

    if (!success) throw new UserInputError('Invalid argument');

    return success;
  }
}
