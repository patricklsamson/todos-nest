import { Module } from '@nestjs/common';
import { TodoService } from '../services/todo/todo.service';
import { TodosController } from '../controllers/todo/todo.controller';

@Module({
  controllers: [TodosController],
  providers: [TodoService]
})
export class TodoModule {}
