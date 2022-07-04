import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Field(() => ID)
  id?: number;

  @Column()
  @IsString()
  @Field(() => String)
  body?: string;

  @Column()
  @IsBoolean()
  @Field(() => Boolean)
  done?: boolean;

  @OneToMany(
    () => Tag,
    tag => tag.todo
  )
  @IsNumber()
  @Field(() => [Tag])
  tags?: Tag[];
}
