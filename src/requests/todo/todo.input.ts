import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

@InputType()
export class TodoInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
