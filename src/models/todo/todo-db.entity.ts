import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagDb } from '../tag/tag-db.entity';

@Entity()
@ObjectType()
export class TodoDb {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field()
  body: string;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  done: boolean;

  @OneToMany(
    () => TagDb,
    tag => tag.todo
  )
  @Field(() => [TagDb], { nullable: true })
  tags?: TagDb[];
}
