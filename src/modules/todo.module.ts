import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/todo/todo.controller';
import { TodoDbController } from '../controllers/todo/todo-db.controller';
import indexEntity from '../models/index.entity';
import { TodoDbResolver } from '../resolvers/todo/todo-db.resolver';
import { TodoResolver } from '../resolvers/todo/todo.resolver';
import { TodoDbService } from '../services/todo/todo-db.service';
import { TodoService } from '../services/todo/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature(indexEntity)],
  controllers: [TodoController, TodoDbController],
  providers: [
    TodoDbResolver,
    TodoDbService,
    TodoResolver,
    TodoService
  ]
})
export class TodoModule {}
