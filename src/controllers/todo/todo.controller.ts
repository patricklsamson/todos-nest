import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { Todo } from 'src/models/todo/todo';
import { TodoService } from 'src/services/todo/todo.service';

@Controller('todos')
export class TodosController {
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
  create(@Body() todo: Todo): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Todo {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.remove(id);
  }
}
