import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

@Entity()
@ObjectType()
export class TagEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  @Field(() => ID)
  id: number;

  @Column({
    nullable: false,
    default: ''
  })
  @Field(() => String)
  name: string;

  @ManyToOne(
    () => TodoEntity,
    todo => todo.tags,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  @Field(() => TodoEntity)
  todo: TodoEntity;
}
