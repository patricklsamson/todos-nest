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
import { TodoNoDbService } from '../../services/todo/todoNoDb.service';

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoNoDbController {
  constructor(private todoService: TodoNoDbService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Todo {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: Todo): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Todo {
    return this.todoService.update(id, todo);
  }

  @Delete()
  removeAll(): void {
    this.todoService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.removeOne(id);
  }
}
