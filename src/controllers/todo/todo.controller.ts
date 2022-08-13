import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: CreateTodoInput): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: UpdateTodoDto
  ): Todo {
    return this.todoService.update(id, todo);
  }

  @Delete()
  removeAll(): boolean {
    return this.todoService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): boolean {
    return this.todoService.removeOne(id);
  }
}
