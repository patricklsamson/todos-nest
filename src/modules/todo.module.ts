import { Module } from '@nestjs/common';
import { TodoEntity } from '../models/todo/todo.entity';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoResolver } from '../resolvers/todo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoResolver, TodoService]
})
export class TodoModule {}
