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
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { TodoDbService } from '../../services/todo/todo-db.service';

@Controller('db-todos')
@UseInterceptors(TransformInterceptor)
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Get()
  findAll(): Promise<TodoDb[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDb> {
    try {
      return await this.todoService.findOne(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post()
  create(@Body() todo: CreateTodoInput): Promise<TodoDb> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: UpdateTodoDto
  ): Promise<TodoDb> {
    try {
      return await this.todoService.update(id, todo);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete()
  removeAll(): Promise<boolean> {
    return this.todoService.removeAll();
  }

  @Delete(':id')
  async removeOne(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
      return await this.todoService.removeOne(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
