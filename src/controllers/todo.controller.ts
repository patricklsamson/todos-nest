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
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { TodoDto } from '../models/todo/todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(): TodoDto[] {
    return this.todoService.findAll();
  }

  @Get('ent')
  findAllEnts(): Promise<TodoDto[]> {
    return this.todoService.findAllEnts();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):TodoDto {
    return this.todoService.findOne(id);
  }

  @Get('ent/:id')
  findOneEnt(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    return this.todoService.findOneEnt(id);
  }

  @Post()
  create(@Body() todo: TodoDto): TodoDto {
    return this.todoService.create(todo);
  }

  @Post('ent')
  createEnt(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todoService.createEnt(todo);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto): TodoDto {
    return this.todoService.update(id, todo);
  }

  @Put('ent/:id')
  updateEnt(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto): Promise<TodoDto> {
    return this.todoService.updateEnt(id, todo);
  }

  @Delete()
  removeAll(): void {
    this.todoService.removeAll();
  }

  @Delete('ent')
  removeAllEnts(): void {
    this.todoService.removeAllEnts();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.removeOne(id);
  }

  @Delete('ent/:id')
  removeOneEnt(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.removeOneEnt(id);
  }
}
