import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;
}
