import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  todoId: number;
}
