import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/todo.controller';
import { TodoEntity } from '../models/todo/todo.entity';
import { TodoResolver } from '../resolvers/todo.resolver';
import { TodoService } from '../services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoResolver, TodoService]
})
export class TodoModule {}
