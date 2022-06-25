import { Module } from '@nestjs/common';
import { TodoEntity } from '../models/todo/todo.entity';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
