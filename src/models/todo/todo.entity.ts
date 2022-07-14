import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field()
  body: string;

  @Field(() => Boolean)
  done: boolean;
}
