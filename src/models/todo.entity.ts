import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Field(() => ID, { nullable: true })
  id?: number;

  @Column()
  @IsString()
  @Field(() => String, { nullable: true })
  body?: string;

  @Column()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  done?: boolean;

  @OneToMany(
    () => Tag,
    tag => tag.todo
  )
  @IsNumber()
  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}
