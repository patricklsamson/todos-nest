import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  body: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
