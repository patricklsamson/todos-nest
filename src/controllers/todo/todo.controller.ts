import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Todo } from '../../models/todo/todo.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { TodoService } from '../../services/todo/todo.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Todo {
    const todo: Todo = this.todoService.findOne(id);

    if (!todo) throw new NotFoundException();

    return todo;
  }

  @Post()
  create(@Body() todo: CreateTodoInput): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: UpdateTodoDto
  ): Todo|boolean {
    const updatedTodo: Todo|boolean = this.todoService.update(id, todo);

    if (!updatedTodo) throw new NotFoundException();

    return updatedTodo;
  }

  @Delete()
  removeAll(): object {
    return { success: this.todoService.removeAll() };
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): object {
    const success: boolean = this.todoService.removeOne(id);

    if (!success) throw new NotFoundException();

    return { success: true };
  }
}
