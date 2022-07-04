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
import { Todo } from '../../models/todo.entity';
import { TodoDbService } from '../../services/todo/todoDb.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Get('db')
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('db/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post('db')
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put('db/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete('db')
  removeAll(): void {
    this.todoService.removeAll();
  }

  @Delete('db/:id')
  removeOne(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.removeOne(id);
  }
}
