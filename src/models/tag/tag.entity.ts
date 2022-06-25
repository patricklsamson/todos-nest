import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column({
    nullable: false,
    default: ''
  })
  name: string;

  @ManyToOne(
    () => TodoEntity,
    todo => todo.tags,
    { onDelete: 'CASCADE' }
  )
  todo: TodoEntity;
}
