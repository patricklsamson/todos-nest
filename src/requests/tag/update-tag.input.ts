import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTagInput } from "./create-tag.input";

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
