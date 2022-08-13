import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTagDbInput } from "./create-tag-db.input";

@InputType()
export class UpdateTagInput extends PartialType(CreateTagDbInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
