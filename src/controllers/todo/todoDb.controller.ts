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
import { TodoDto } from '../../models/todo/todo.dto';
import { TodoDbService } from '../../services/todo/todoDb.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Get('db')
  findAll(): Promise<TodoDto[]> {
    return this.todoService.findAll();
  }

  @Get('db/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    return this.todoService.findOne(id);
  }

  @Post('db')
  create(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todoService.create(todo);
  }

  @Put('db/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto): Promise<TodoDto> {
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
