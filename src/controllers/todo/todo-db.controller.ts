import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // UseInterceptors
} from '@nestjs/common';
// import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { TodoDb } from '../../models/todo/todo-db.entity';
import { CreateTodoInput } from '../../requests/todo/create-todo.input';
import { UpdateTodoDto } from '../../requests/todo/update-todo.dto';
import { TodoDbService } from '../../services/todo/todo-db.service';

@Controller('db-todos')
// @UseInterceptors(TransformInterceptor)
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Get()
  findAll(): Promise<TodoDb[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDb> {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: CreateTodoInput): Promise<TodoDb> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: UpdateTodoDto
  ): Promise<TodoDb> {
    return this.todoService.update(id, todo);
  }

  @Delete()
  removeAll(): Promise<object> {
    return this.todoService.removeAll();
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.todoService.removeOne(id);
  }
}
