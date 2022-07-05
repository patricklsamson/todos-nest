import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSampleGqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
