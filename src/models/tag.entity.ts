import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column()
  @IsString()
  @Field(() => String)
  name: string;

  @ManyToOne(
    () => Todo,
    todo => todo.tags,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  @IsNumber()
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}
