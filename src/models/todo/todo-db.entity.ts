import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { TagDb } from '../tag/tag-db.entity';

@Entity('todos')
@ObjectType()
export class TodoDb {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  body: string;

  @Column({ type: 'boolean', default: false })
  @Field()
  done: boolean;

  @OneToMany(
    () => TagDb,
    tag => tag.todo
  )
  @Field(() => [TagDb], { nullable: true })
  tags?: TagDb[];

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;
}
