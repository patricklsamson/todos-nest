import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
