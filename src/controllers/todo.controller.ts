import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { Todo } from '../models/todo/todo';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('dto')
  findAllDtos(): Todo[] {
    return this.todoService.findAllDtos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Get('dto/:id')
  findOneDto(@Param('id', ParseIntPipe) id: number):Todo {
    return this.todoService.findOneDto(id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Post('dto')
  createDto(@Body() todo: Todo): Todo {
    return this.todoService.createDto(todo);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Put('dto/:id')
  updateDto(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Todo {
    return this.todoService.updateDto(id, todo);
  }

  @Delete()
  removeAll(): void {
    this.todoService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.remove(id);
  }

  @Delete('dto/:id')
  removeDto(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.removeDto(id);
  }
}
