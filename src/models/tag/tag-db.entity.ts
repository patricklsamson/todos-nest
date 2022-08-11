import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoDb } from '../todo/todo-db.entity';

@Entity({ name: 'tags' })
@ObjectType()
export class TagDb {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  name: string;

  @ManyToOne(
    () => TodoDb,
    todo => todo.tags,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  @JoinColumn({ name: 'todo_id' })
  @Field(() => TodoDb, { nullable: true })
  todo: TodoDb;

  @Column({ name: 'todo_id', type: 'int' })
  todoId: number;
}
