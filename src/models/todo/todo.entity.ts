import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';

@Entity()
@ObjectType()
export class TodoEntity {
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
  body?: string;

  @Column({
    nullable: false,
    default: false
  })
  @Field(() => Boolean)
  done?: boolean;

  @OneToMany(
    () => TagEntity,
    tag => tag.todo
  )
  @Field(() => [TagEntity])
  tags?: TagEntity[];
}
