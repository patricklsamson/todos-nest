import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column({
    nullable: false,
    default: ''
  })
  body: string;

  @Column({
    nullable: false,
    default: false
  })
  done: boolean;

  @OneToMany(
    () => TagEntity,
    tag => tag.todo
  )
  tags: TagEntity[];
}
