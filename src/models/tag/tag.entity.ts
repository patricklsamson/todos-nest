import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tag {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;
}
