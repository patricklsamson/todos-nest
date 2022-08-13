import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  done?: boolean;
}
