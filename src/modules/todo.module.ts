import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/todo/todo.controller';
import { TodoDbController } from '../controllers/todo/todoDb.controller';
import entities from '../models/index.entity';
import todoProviders from '../providers/todo.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [TodoController, TodoDbController],
  providers: todoProviders
})
export class TodoModule {}
