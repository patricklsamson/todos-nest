import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoDbController } from '../controllers/todo/todoDb.controller';
import { TodoNoDbController } from '../controllers/todo/todoNoDb.controller';
import entities from '../models/index.entity';
import todoProviders from '../providers/todo.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [TodoDbController, TodoNoDbController],
  providers: todoProviders
})
export class TodoModule {}
