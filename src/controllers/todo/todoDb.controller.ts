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
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoDto } from '../../requests/todo/create-todo.dto';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { TodoDbService } from '../../services/todo/todo-db.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Get('db')
  findAll(): Promise<TodoDb[]> {
    return this.todoService.findAll();
  }

  @Get('db/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDb> {
    return this.todoService.findOne(id);
  }

  @Post('db')
  create(@Body() todo: CreateTodoDto): Promise<TodoDb> {
    return this.todoService.create(todo);
  }

  @Put('db/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: UpdateTodoDto): Promise<TodoDb> {
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
